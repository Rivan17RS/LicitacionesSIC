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
    public class PagosUsuarioController : ApiController
    {
        PagosUsuarioManager _Manager = new PagosUsuarioManager();

        [HttpPost]

        public Response CrearPagoUsuario(PagosUsuarios PagoUsuario)
        {
            return _Manager.CrearPagoUsuario(PagoUsuario);
        }

        public Response ActualizarPagoUsuario(PagosUsuarios PagoUsuario)
        {
            return _Manager.ActualizarPagoUsuario(PagoUsuario);
        }

        public Response EliminarPagoUsuario(int IdPago)
        {
            return _Manager.EliminarPagoUsuario(IdPago);
        }

        [HttpGet]

        public PagosUsuarios ObtenerPagoUsuario(int IdPago)
        {
            return _Manager.ObtenerPago(IdPago);
        }

        [HttpGet]

        public List<PagosUsuarios> ObtenerPagosUsuarios()
        {
            return _Manager.ObtenerPagos();
        }

        [HttpPost]

        public List<PagosUsuarios> ObtenerPagosUsuariosFiltro(PagosUsuarios PagosUsuarios)
        {
            return _Manager.ObtenerPagos(PagosUsuarios);
        }

        [HttpGet]

        public List<PagosUsuarios> ObtenerPagosUsuarioIdUser(int IdUser)
        {
            return _Manager.ObtenerPagosIdUser(IdUser);
        }



    }
}
