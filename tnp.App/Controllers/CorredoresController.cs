using System.Web.Http;
using tnp.Data.Models;

namespace tnp.App.Controllers
{
    [Authorize]
    public class CorredoresController : ApiController
    {
        [HttpGet]       
        public CorredorCollection List() 
        {
            return CorredorCollection.List();
        }
    }
}
