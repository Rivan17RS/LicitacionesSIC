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
    public class PremiumController : ApiController
    {
        PremiumManager pm = new PremiumManager();

        [HttpPost]
        public Response CrearPremium(Subscripcion prod)
        {
            return pm.CrearPremium(prod);
        }

        [HttpGet]

        public Subscripcion ObtenerPremium(int id)
        {
            return pm.ObtenerPremium(id);
        }

        [HttpGet]
        public List<Subscripcion> ObtenerTodosPremium() 
        {
            return pm.ObtenerTodosPremium();
        }

        [HttpPost]
        public Response ActualizarPremium(Subscripcion prod)
        {
            return pm.ActualizarPremium(prod);
        }

        [HttpPost]

        public string EliminarPremium(int id)
        {
            return pm.EliminarPremium(id);
        }

    }
}
