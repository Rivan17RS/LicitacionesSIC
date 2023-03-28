using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAppUI.Controllers
{
    public class ErrorMessageController : Controller
    {
        // GET: ErrorMessage
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ErrorMessage(string message)
        {
            ViewBag.Message = message;
            return View();
        }
    }
}