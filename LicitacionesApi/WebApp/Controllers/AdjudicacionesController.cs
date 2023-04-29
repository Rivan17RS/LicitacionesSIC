using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AppLogic;
using DTO;

namespace WebApp.Controllers
{
    public class AdjudicacionesController : ApiController
    {
        AdjudicacionManager am = new AdjudicacionManager();
        [HttpPost]
        public Response CrearAdjudicacion(Adjudicaciones adj)
        {
            return am.CrearAdjudicacion(adj);
        }
        [HttpGet]
        public Adjudicaciones ObtenerAdjudicacionId(int Id)
        {
            return am.ObtenerAdjudicacionPorId(Id);
        }
        [HttpGet]
        public List<Adjudicaciones> ObtenerAdjudicaciones()
        {
            return am.ObtenerAdjudicaciones();
        }
        [HttpPost]
        public Response ActualizarAdjudicacion(Adjudicaciones adj)
        {
            return am.ActualizarAdjudicacion(adj);
        }
        [HttpPost]
        public Response EliminarAdjudicacion(Adjudicaciones adjudicaciones)
        {
            return am.EliminarAdjudicacion(adjudicaciones);
        }
    }
}