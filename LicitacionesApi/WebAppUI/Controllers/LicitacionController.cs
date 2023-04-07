using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAppUI.Controllers
{
    public class LicitacionController : Controller
    {
        // GET: Licitacion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Licitaciones() 
        { 
            return View();
        }

        public ActionResult CrearLicitaciones()
        {
            return View();
        }

        public ActionResult AbrirLicitacion()
        {
            return View();
        }
    }
}