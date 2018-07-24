using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class Linha
    {
        #region Propriedades
        [JsonProperty("CodigoLinha")]
        public int Codigo { get; set; }
        public bool Circular { get; set;}
        public string Letreiro { get; set; }
        public int Sentido { get; set; }
        public int Tipo { get; set; }
        public string DenominacaoTPTS { get; set; }
        public string DenominacaoTSTP { get; set; }
        public string Informacoes { get; set; }
        #endregion
    }

    public class LinhaCollection : List<Linha> 
    {
        /// <summary>
        /// Busca as linhas tendo como chaves denominação ou o número da linha (total/parcial)
        /// </summary>
        /// <param name="value">Valor de pesquisa</param>
        /// <returns>Coleção de Linhas</returns>
        public static LinhaCollection List(string value)
        {
            string MethodURL = "/Linha/Buscar?termosBusca={0}";
            return spTransApi<LinhaCollection>.DoRequest(string.Format(MethodURL,value));
        }
    }

    public class LinhaDetalhe 
    {
        /// <summary>
        /// Listas os detalhes de uma linha
        /// </summary>
        /// <param name="Codigo">Codigo da linha</param>
        /// <returns>Detalhes de uma linha</returns>
        public LinhaDetalhe Get(int Codigo) {
            string MethodUrl = "/Linha/CarregarDetalhes?codigoLinha={0}";
            return spTransApi<LinhaDetalhe>.DoRequest(string.Format(MethodUrl, Codigo));
        }
    }
}
