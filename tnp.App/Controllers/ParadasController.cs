using System.Web.Http;
using tnp.Data.Models;

namespace tnp.App.Controllers
{
    [Authorize]
    public class ParadasController : ApiController
    {
        [HttpGet]
        public ParadaCollection List(string Value) 
        {
            return ParadaCollection.List(Value);
        }

        [HttpGet]
        public ParadaCollection ListByCorredor(int Codigo) 
        {
            return ParadaCollection.ListByCorredor(Codigo);
        }

        [HttpGet]
        public ParadaCollection ListByLinha(int Codigo) 
        {
            return ParadaCollection.ListByLinha(Codigo);
        }

        [HttpGet]
        public PrevisaoLinhasEmPonto ListPrevisaoLinhasEmPonto(int Codigo) 
        {
            return PrevisaoLinhasEmPonto.Get(Codigo);
        }

        [HttpGet]
        public PrevisaoLinhasEmPonto ListPrevisaoLinhaEmPonto(int CodigoPonto, int CodigoLinha) 
        {
            return PrevisaoLinhasEmPonto.Get(CodigoPonto, CodigoLinha);
        }
    }
}
