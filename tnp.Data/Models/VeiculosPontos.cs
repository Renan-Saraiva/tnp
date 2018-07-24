using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tnp.Data.Models
{
    public class VeiculosPontos
    {
        public LocalizacaoVeiculosLinha Linha { get; set; }

        public ParadaCollection Pontos { get; set; }

        public static VeiculosPontos Get(int Codigo) 
        {
            VeiculosPontos vp = new VeiculosPontos();
            vp.Linha = LocalizacaoVeiculosLinha.Get(Codigo);
            vp.Pontos = ParadaCollection.ListByLinha(Codigo);
            return vp;
        }
    }
}
