using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class PrevisaoLinhasEmPonto
    {
        [JsonProperty("hr")]
        public string HoraConsulta { get; set; }
        
        [JsonProperty("p")]
        public LinhasEmPonto Ponto { get; set; }

        /// <summary>
        /// Lista a localização e a previsão dos veiculos de uma linha em um determinado ponto
        /// </summary>
        /// <param name="CodigoParada">Código do ponto</param>
        /// <param name="CodigoLinha">Código da linha</param>
        /// <returns>Coleção de previsão e localização dos veiculos</returns>
        public static PrevisaoLinhasEmPonto Get(int CodigoParada, int CodigoLinha) 
        {
            string MethodURL = "/Previsao?codigoParada={0}&codigoLinha={1}";
            return spTransApi<PrevisaoLinhasEmPonto>.DoRequest(string.Format(MethodURL, CodigoParada, CodigoLinha));
        }

        /// <summary>
        /// Lista a localização e a previsão dos veiculos de todas as linhas de um determinado ponto
        /// </summary>
        /// <param name="CodigoParada">Codigo do ponto</param>
        /// <returns>Coleção de previsão e localização dos veiculos</returns>
        public static PrevisaoLinhasEmPonto Get(int CodigoParada)
        {
            string MethodURL = "/Previsao/Parada?codigoParada={0}";
            return spTransApi<PrevisaoLinhasEmPonto>.DoRequest(string.Format(MethodURL, CodigoParada));
        }
    }
}
