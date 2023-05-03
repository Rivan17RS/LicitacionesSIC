using AppLogic;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class DetalleLicitacionesController : ApiController
    {
        [HttpPost]
        public string CrearDetalleLicitacion(DetalleLicitaciones detalle)
        {
            var dlm = new DetalleLicitacionesManager();
            return dlm.CrearDetalleLicitacion(detalle);
        }

        [HttpGet]
        public DetalleLicitaciones ObtenerDetalleLicitacion(int Id)
        {
            var dlm = new DetalleLicitacionesManager();
            return dlm.ObtenerDetalleLicitacion(Id);
        }

        [HttpPost]
        public string ActualizaDetalleLicitacion(int IdLicitacion, int IdProducto, int Cantidad,int IdUsrActualizacion)
        {
            var dlm = new DetalleLicitacionesManager();
            var d = new DetalleLicitaciones()
            {
                IdLicitacion = IdLicitacion,
                Idproducto = IdProducto,
                Cantidad = Cantidad,
                IdUsrActualizacion = IdUsrActualizacion
            };

            return dlm.ActualizarDetalleLicitacion(d);
        }

        [HttpPost]
        public string EliminarDetalleLicitacion(int Id)
        {
            var dlm = new DetalleLicitacionesManager();
            return dlm.EliminarDetalleLicitacion(Id);
        }

        [HttpGet]

        public List<DetalleLicitaciones> ObtenerDetalleLicitaciones()
        {
            var dlm = new DetalleLicitacionesManager();
            return dlm.ObtenerDetalleLicitaciones();
        }

        [HttpGet]

        public List<DetalleLicitaciones> ObtenerDetalleLicitacionesId(int IdLicitacion)
        {
            var dlm = new DetalleLicitacionesManager();
            return dlm.ObtenerDetalleLicitacionesId(IdLicitacion);
        }
    }
}
