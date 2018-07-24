using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Caching;

namespace tnp.Data.WebApi
{
    public class General
    {
        public static string ApiCredentials 
        {
            get 
            {
                object o = HttpContext.Current.Session["apiCredentials"];
                if (o != null && General.RequestOn.AddMinutes(30).CompareTo(DateTime.Now) == 1)  
                    return (string)o;
                else
                {
                    string apiCredentials;
                    if (spTransApiConfig.Login(out apiCredentials)) 
                    {
                        General.ApiCredentials = apiCredentials;
                        General.RequestOn = DateTime.Now;
                    }
                    else
                        throw new Exception("Erro ao autenticar-se no serviço da spTrans");
                    return apiCredentials;
                }
            }
            set 
            {
                HttpContext.Current.Session["apiCredentials"] = value;
            }
        }

        public static DateTime RequestOn 
        {
            get    
            {
                object o = HttpContext.Current.Session["RequestOn"];
                if (o != null) 
                    return (DateTime)o;
                return DateTime.MinValue;
            }
            set 
            {
                HttpContext.Current.Session["RequestOn"] = value;
            }
        }
    }
}
