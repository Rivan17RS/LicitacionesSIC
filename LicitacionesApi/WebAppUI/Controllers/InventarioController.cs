using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAppUI.Controllers
{
    public class InventarioController : Controller
    {
        // GET: Inventario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Inventario()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Inventario(Producto producto)
        {

            return View();
        }
    }
}