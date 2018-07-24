using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using tnp.Data.WebApi;
using tnp.Data.Models;

namespace tnp.App.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        // GET: /Dashboard/
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Favoritos() 
        {
            List<Favorito> Favoritos = Favorito.GetByUsuario(User.Identity.Name);
            return PartialView(Favoritos);
        }
    }
}
