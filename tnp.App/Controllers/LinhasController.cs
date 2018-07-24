using System.IO;
using System.Web.Http;
using System.Xml;
using System.Xml.Serialization;
using tnp.Data.Models;
using Newtonsoft.Json;
using System.Linq;
using System.Collections;

namespace tnp.App.Controllers
{
    [Authorize]
    public class LinhasController : ApiController
    {
        [HttpGet]
        public LinhaCollection List(string Value)
        {
            return LinhaCollection.List(ReplaceValues(Value));
        }

        [HttpGet]
        public LocalizacaoVeiculosLinha ListLocalizacaoVeiculos(int Codigo) 
        {
            return LocalizacaoVeiculosLinha.Get(Codigo);
        }

        [HttpGet]
        public PrevisaoLinhaEmPontos ListPrevisaoLinhaEmPontos(int Codigo) 
        {
            return PrevisaoLinhaEmPontos.Get(Codigo);
        }

        [HttpGet]
        public VeiculosPontos ListVeiculosEPontos(int Codigo)
        {
            return VeiculosPontos.Get(Codigo);           
        }

        public string ReplaceValues(string value) {
            value = value.Replace(" Rua ", " R ");
            value = value.Replace(" Avenida ", " Av ");
            return value;
        }
    }                                                                                       
}