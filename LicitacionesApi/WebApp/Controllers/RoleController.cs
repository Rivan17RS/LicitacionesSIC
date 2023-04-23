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
    public class RoleController : ApiController
    {
        RoleManager rm = new RoleManager();

        [HttpPost]
        public Response CrearRole(Roles rol)
        {
            return rm.CrearRole(rol);
        }

        [HttpGet]

        public Roles ObtenerRoleId(int Id)
        {
            return rm.ObtenerRoleId(Id);
        }

        [HttpGet]
        public List<Roles> ObtenerRoles()
        {
            return rm.ObtenerRoles();
        }

        [HttpPost]
        public Response ActualizarRole(Roles rol)
        {
            return rm.ActualizarRole(rol);
        }

        [HttpPost]

        public string EliminarRole(int Id)
        {
            return rm.EliminarRole(Id);
        }
    }
}
