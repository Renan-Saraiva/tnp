using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using tnp.Data.Context;
using System.Runtime.Serialization;

namespace tnp.Data.Models
{
    public enum FavoritosType 
    {
        Linha = 1,
        Corredor = 2,
        Ponto = 3
    }

    [DataContract]
    [Table("Favoritos")]
    public class Favorito
    {
        [DataMember]
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [DataMember]
        [Index,MaxLength(112)]
        public string UserName { get; set; }
        [DataMember(IsRequired = true)]
        [Required]
        public FavoritosType Tipo { get; set; }
        [Required]
        [DataMember(IsRequired = true)]
        public int Codigo { get; set; }
        [DataMember(IsRequired = true)]
        [Required,MaxLength(150)]
        public string Nome { get; set; }

        public bool Add()
        {
            try
            {
                using (var Repository = new AppContext())
                {
                    Repository.Favoritos.Add(this);
                    Repository.SaveChanges();
                }
                return true;
            }
            catch (Exception) {
                return false;
            }
        }

        public static Favorito Get(int Id)
        {
            Favorito fv;
            using (var Repository = new AppContext())
            {
                 fv = Repository.Favoritos.Find(Id);
            }
            return fv;
        }

        public static Favorito GetByCodigo(string UserName, int Codigo, FavoritosType ft)
        {
            Favorito fv;
            using (var Repository = new AppContext())
            {
                fv = Repository.Favoritos.FirstOrDefault(n => n.Codigo == Codigo && n.Tipo == ft && n.UserName == UserName);
            }
            return fv;
        }

        public static bool Delete(int Id)
        {
            try 
            {
                using (var Repository = new AppContext())
                {
                    Repository.Entry(new Favorito { Id = Id }).State = EntityState.Deleted;
                    Repository.SaveChanges();
                }
                return true;
            }
            catch(Exception) {
                return false;
            }
        }

        public static List<Favorito> GetByUsuario(string UserName)
        {
            List<Favorito> fvList;
            using (var Repository = new AppContext())
            {
                fvList = Repository.Favoritos.Where(n => n.UserName == UserName).ToList();
            }
            return fvList;
        }
    }
}