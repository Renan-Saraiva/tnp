using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class Parada
    {
        [JsonProperty("CodigoParada")]
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class ParadaCollection : List<Parada> 
    {
        /// <summary>
        /// Busca as paradas tendo como chaves nome da parada ou endereço de localização (total/parcial)
        /// </summary>
        /// <param name="Value">Valor de pesquisa</param>
        /// <returns>Coleção de Paradas</returns>
        public static ParadaCollection List(string Value) {
            string MethodURL = "/Parada/Buscar?termosBusca={0}";
            return spTransApi<ParadaCollection>.DoRequest(string.Format(MethodURL, Value));
        }

        /// <summary>
        /// Lista as paradas de uma linha
        /// </summary>
        /// <param name="CodigoLinha">Código da Linha</param>
        /// <returns>Coleção de Paradas</returns>
        public static ParadaCollection ListByLinha(int CodigoLinha) 
        {
            string MethodURL = "/Parada/BuscarParadasPorLinha?codigoLinha={0}";
            return spTransApi<ParadaCollection>.DoRequest(string.Format(MethodURL, CodigoLinha));
        }

        /// <summary>
        /// Lista as paradas de um corredor
        /// </summary>
        /// <param name="CodigoCorredor">Código do corredor</param>
        /// <returns>Coleção de Paradas</returns>
        public static ParadaCollection ListByCorredor(int CodigoCorredor) 
        {
            string MethodURL = "/Parada/BuscarParadasPorCorredor?codigoCorredor={0}";
            return spTransApi<ParadaCollection>.DoRequest(string.Format(MethodURL, CodigoCorredor));
        }     
    }
}
