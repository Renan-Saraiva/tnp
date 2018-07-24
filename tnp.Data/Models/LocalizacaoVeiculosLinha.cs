using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class LocalizacaoVeiculosLinha
    {
        [JsonProperty("hr")]
        public string HoraConsulta { get; set; }

        [JsonProperty("vs")]
        public PosicaoCollection Posicoes { get; set; }

        /// <summary>
        /// Localiza os veiculos de uma linha
        /// </summary>
        /// <param name="CodigoLinha">Codigo da linha</param>
        /// <returns>Localização dos veiculos</returns>
        public static LocalizacaoVeiculosLinha Get(int CodigoLinha) 
        {
            string MethodURL = "/Posicao?codigoLinha={0}";
            return spTransApi<LocalizacaoVeiculosLinha>.DoRequest(string.Format(MethodURL, CodigoLinha));
        }
    }
}
