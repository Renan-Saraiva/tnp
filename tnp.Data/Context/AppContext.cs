using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tnp.Data.Models;

namespace tnp.Data.Context
{
    public class AppContext  : DbContext
    {
        public  AppContext() : base(nameOrConnectionString:"tcc") {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }            

        public DbSet<Favorito> Favoritos { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }
    }
}
