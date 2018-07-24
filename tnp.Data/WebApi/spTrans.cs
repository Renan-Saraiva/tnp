using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;
using System.Linq;

namespace tnp.Data.WebApi
{
    public class spTransApi<T> where T : new()
    {
        public static T DoRequest(string method)
        {
            T r = default(T);
            try
            {
                string requestURI = string.Format("{0}{1}", spTransApiConfig.Version, method);
                Uri uri = new Uri(spTransApiConfig.Domain);

                HttpClientHandler handler = new HttpClientHandler();
                handler.CookieContainer = new CookieContainer();
                handler.CookieContainer.Add(uri, new Cookie("apiCredentials", General.ApiCredentials));

                HttpClient cliente = new HttpClient(handler);
                cliente.BaseAddress = uri;
                cliente.Timeout = TimeSpan.FromMilliseconds(spTransApiConfig.TimeOut);
                r = JsonDeserializer<T>.DeserializeFromStream(cliente.GetStreamAsync(requestURI).Result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return r;
        }
    }

    public class spTransApiConfig
    {
        #region propriedades
        public static string Domain
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["spTrans.Domain"];
            }
        }

        public static string Version
        {
            get
            {
                return string.Format("/v{0}", System.Configuration.ConfigurationManager.AppSettings["spTrans.Version"]);
            }
        }

        public static string Token
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["spTrans.Token"];
            }
        }

        public static string Url
        {
            get
            {
                return string.Format("{0}{1}", spTransApiConfig.Domain, spTransApiConfig.Version);
            }
        }

        public static int TimeOut
        {
            get
            {
                int r = 0;
                int.TryParse(System.Configuration.ConfigurationManager.AppSettings["spTrans.TimeOut"], out r);
                return r;
            }
        }
        #endregion

        public static bool Login(out string apiCredentials)
        {
            HttpClient client = new HttpClient();
            bool r = false;
            client.BaseAddress = new Uri(spTransApiConfig.Domain);
            HttpResponseMessage response = client.PostAsync(string.Format("{0}/Login/Autenticar?token={1}", spTransApiConfig.Version, spTransApiConfig.Token), new FormUrlEncodedContent(new Dictionary<string, string>())).Result;
            if (response.IsSuccessStatusCode)
            {
                r = response.Content.ReadAsAsync<bool>().Result;
                IEnumerable<string> cookieHeader;
                response.Headers.TryGetValues("Set-Cookie", out cookieHeader);
                apiCredentials = cookieHeader.FirstOrDefault().Split(';')[0].Split('=')[1];
            }
            else
                apiCredentials = null;
            return r;
        }
    }
}
