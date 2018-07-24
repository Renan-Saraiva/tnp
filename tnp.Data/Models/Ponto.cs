using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace tnp.Data.Models
{
    public class LinhasEmPonto
    {
        [JsonProperty("cp")]
        public string Codigo { get; set; }
        [JsonProperty("np")]
        public string Nome { get; set; }
        [JsonProperty("py")]
        public double Latitude { get; set; }
        [JsonProperty("px")]
        public double Longitude { get; set; }
        [JsonProperty("l")]
        public LinhaPosicoesCollection Linhas { get; set; }
    }

    public class VeiculosEmPonto
    {
        [JsonProperty("cp")]
        public string Codigo { get; set; }
        [JsonProperty("np")]
        public string Nome { get; set; }
        [JsonProperty("py")]
        public double Latitude { get; set; }
        [JsonProperty("px")]
        public double Longitude { get; set; }
        [JsonProperty("vs")]
        public PosicaoCollection Veiculos { get; set;}
    }

    public class VeiculosEmPontoCollection : List<VeiculosEmPonto> { }
}
