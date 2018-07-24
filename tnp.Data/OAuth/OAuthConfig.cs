using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tnp.Data.OAuth
{
    public class OAuthConfig
    {
        public class Facebook 
        {
            public static string Id 
            {
                get
                {
                    return System.Configuration.ConfigurationManager.AppSettings["Facebook.Id"];
                }
           }

            public static string Secret
            {
                get 
                {
                    return System.Configuration.ConfigurationManager.AppSettings["Facebook.Secret"];
                }
            }
        }
    }
}
