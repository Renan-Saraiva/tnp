using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class PrevisaoLinhaEmPontos
    {
        [JsonProperty("hr")]
        public string HoraConsulta { get; set; }

        [JsonProperty("ps")]
        public VeiculosEmPontoCollection Pontos { get; set; }

        /// <summary>
        /// Lista a localização e a previsão de chegada de todos os veiculos em todos os pontos da linha
        /// </summary>
        /// <param name="CodigoLinha">Código da linha</param>
        /// <returns>Coleção de previsão e localização de veiculos de uma linha</returns>
        public static PrevisaoLinhaEmPontos Get(int CodigoLinha)
        {
            string MethodURL = "/Previsao/Linha?codigoLinha={0}";
            return spTransApi<PrevisaoLinhaEmPontos>.DoRequest(string.Format(MethodURL, CodigoLinha));
        }
    }
}
