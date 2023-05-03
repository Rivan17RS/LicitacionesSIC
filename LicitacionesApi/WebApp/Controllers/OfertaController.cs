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
    public class OfertasController : ApiController
    {
        OfertasManager _Manager = new OfertasManager();

        [HttpPost]

        public Response CrearOfertas(Ofertas Ofertas)
        {
            return _Manager.CrearOfertas(Ofertas);
        }
        public Response ActualizarOfertas(Ofertas Ofertas)
        {
            return _Manager.ActualizarOfertas(Ofertas);
        }
        public Response EliminarOfertas(Ofertas ofertas)
        {
            return _Manager.EliminarOfertas(ofertas);
        }

        [HttpGet]

        public Ofertas ObtenerOfertasPorId(int Id)
        {
            return _Manager.ObtenerOfertasPorId(Id);
        }
        [HttpGet]
        public List<Ofertas> ObtenerOfertasPorIdLicitacion(int IdLicitacion)
        {
            return _Manager.ObtenerOfertasPorIdLicitacion(IdLicitacion);
        }

        public Ofertas ObtenerOfertasPorIdOferta(int IdOferta)
        {
            return _Manager.ObtenerOfertasPorIdOferta(IdOferta);
        }

        [HttpGet]

        public List<Ofertas> ObtenerOfertas()
        {
            return _Manager.ObtenerOfertas();
        }


    }
}