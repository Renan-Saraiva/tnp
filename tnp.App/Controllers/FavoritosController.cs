using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using tnp.Data.Models;

namespace tnp.App.Controllers
{
    [Authorize]
    public class FavoritosController : ApiController
    {
        [HttpGet]
        public List<Favorito> List()
        {
            return Favorito.GetByUsuario(User.Identity.Name);
        }

        [HttpGet]
        public Favorito Get(int Id)
        {
            return Favorito.Get(Id);
        }

        [HttpGet]
        public Favorito GetByCodigo(int Codigo, FavoritosType Tipo) 
        {
            return Favorito.GetByCodigo(User.Identity.Name, Codigo, Tipo);    
        }

        [HttpPost]
        public Favorito Post(Favorito fv)
        {
            try
            {
                fv.UserName = User.Identity.Name;                       
                fv.Add();
                return fv;
            }
            catch (Exception) {
                return null;
            }
        }

        [HttpDelete]
        public bool Delete(int Id)
        {
            return Favorito.Delete(Id);
        }
    }
}
