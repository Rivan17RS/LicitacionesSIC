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
    public class DetalleOfertasController : ApiController
    {
        DetalleOfertasManager _Manager = new DetalleOfertasManager();

        [HttpPost]

        public Response CrearDetalleOfertas(DetalleOfertas detalleOfertas)
        {
            return _Manager.CrearDetalleOfertas(detalleOfertas);
        }
        public Response ActualizarDetalleOfertas(DetalleOfertas detalleOfertas)
        {
            return _Manager.ActualizarDetalleOfertas(detalleOfertas);
        }
        public Response EliminarDetalleOfertas(DetalleOfertas detalleOfertas)
        {
            return _Manager.EliminarDetalleOfertas(detalleOfertas);
        }

        [HttpGet]

        public List<DetalleOfertas> ObtenerDetalleOfertasPorIdOfer(int IdOferta)
        {
            return _Manager.ObtenerDetalleOfertasPorId(IdOferta);
        }

        [HttpGet]
        
        public List<DetalleOfertas> ObtenerDetalleOfertas()
        {
            return _Manager.ObtenerDetalleOfertas();
        }


    }
}