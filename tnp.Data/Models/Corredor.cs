using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class Corredor
    {
        [JsonProperty("CodCorredor")]
        public int Codigo { get; set; }
        public int CodCot { get; set; }
        public string Nome { get; set; }
    }

    public class CorredorCollection : List<Corredor> 
    {
        /// <summary>
        /// Lista todos os corredores
        /// </summary>
        /// <returns>Coleção de Corredores</returns>
        public static CorredorCollection List() 
        {
            string MethodUrl = "/Corredor";
            return spTransApi<CorredorCollection>.DoRequest(MethodUrl);
        }
    }
}
