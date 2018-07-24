using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace tnp.Data.Models
{
    public class LinhaPosicoes
    {
        [JsonProperty("cl")]
        public int Codigo {get; set;}        
        [JsonProperty("c")]
        public string Letreiro {get; set;}        
        [JsonProperty("sl")]
        public int Sentido {get; set;}
        [JsonProperty("lt0")]
        public string DenominacaoTPTS { get; set; }        
        [JsonProperty("lt1")]
        public string DenominacaoTSTP { get; set; }
        [JsonProperty("qv")]
        public int QuantidadeVeiculos { get; set; }
        [JsonProperty("vs")]
        public PosicaoCollection Veiculos {get; set;}
    }

    public class LinhaPosicoesCollection : List<LinhaPosicoes> { }
}
