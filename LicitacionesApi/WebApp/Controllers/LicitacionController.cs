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
        [HttpGet]
        public Licitaciones ObtenerLicitacion(int Id)
        {
            LicitacionesManager lm = new LicitacionesManager();
            return lm.ObtenerLicitacion(Id);
        }
        [HttpPost]
        public string ActualizarLicitacion(int Id, string Titulo, string Descripcion, string LugarEntrega, DateTime FechaCierreOfertas, double MontoPresupuestado,string CodigoQr, string Estado, int IdUsrActualizacion)
        {
            var lm = new LicitacionesManager();
            var l = new Licitaciones
            {
                Id= Id,
                Titulo= Titulo,
                Descripcion= Descripcion,
                LugarEntrega= LugarEntrega,
                FechaCierreOfertas=FechaCierreOfertas,
                MontoPresupuestado= MontoPresupuestado,
                CodigoQR   = CodigoQr,
                Estado= Estado,
                IdUsrActualizacion= IdUsrActualizacion
            };

            return lm.ActualizarLicitacion(l);
        }

        [HttpPost]

        public string EliminarLicitacion(int Id)
        {
            var lm = new LicitacionesManager();
            return lm.EliminarLicitacion(Id);
        }

        [HttpGet]

        public List<Licitaciones> ObtenerLicitaciones()
        {
            var lm  = new LicitacionesManager();
            return lm.ObtenerLicitaciones();
        }
    }
}