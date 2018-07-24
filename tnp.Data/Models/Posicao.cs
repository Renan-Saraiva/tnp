using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using tnp.Data.WebApi;

namespace tnp.Data.Models
{
    public class Posicao
    {
        [JsonProperty("p")]
        public string Prefixo { get; set; }
        [JsonProperty("t")]
        public string Previsao { get; set; }
        [JsonProperty("a")]
        public bool Acessibilidade { get; set; }
        [JsonProperty("py")]
        public double Latitude { get; set; }
        [JsonProperty("px")]
        public double Longitude { get; set; }
    }

    public class PosicaoCollection : List<Posicao> { }
}
