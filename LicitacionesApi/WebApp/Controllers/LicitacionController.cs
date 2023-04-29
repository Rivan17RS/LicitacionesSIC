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
        public string CrearLicitacion(Licitaciones lic)
        {
            var lm = new LicitacionesManager();

            return lm.CrearLicitacion(lic);
        }
        [HttpGet]
        public Licitaciones ObtenerLicitacion(int Id)
        {
            LicitacionesManager lm = new LicitacionesManager();
            return lm.ObtenerLicitacion(Id);
        }
        [HttpPost]
        public string ActualizarLicitacion(Licitaciones lic)
        {
            var lm = new LicitacionesManager();

            return lm.ActualizarLicitacion(lic);
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

        [HttpPost]
        public List<Licitaciones> ObtenerLicitacionesFiltro(Licitaciones Licitacion)
        {
            var lm = new LicitacionesManager();
            return lm.ObtenerLicitaciones(Licitacion);
        }
    }
}