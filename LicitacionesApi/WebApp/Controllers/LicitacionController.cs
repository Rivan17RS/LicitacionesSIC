using AppLogic;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class LicitacionController : ApiController
    {
        [HttpPost]
        public string CrearLicitacion(int IdAnalista ,string Titulo,string Descripcion, string LugarEntrega,DateTime FechaCierreOfertas,double MontoPresupuestado, int IdUsrCreacion)
        {
            var lm = new LicitacionesManager();
            var l = new Licitaciones()
            {
                IdAnalista = IdAnalista ,
                Titulo = Titulo ,
                Descripcion= Descripcion ,
                LugarEntrega= LugarEntrega ,
                FechaCierreOfertas= FechaCierreOfertas ,
                MontoPresupuestado= MontoPresupuestado ,
                IdUsrCreacion= IdUsrCreacion
            };

            return lm.CrearLicitacion(l);
        }
    }
}