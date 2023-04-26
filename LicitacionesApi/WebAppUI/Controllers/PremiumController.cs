using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using ZXing;

namespace WebAppUI.Controllers
{
    public class PremiumController : Controller
    {
        // GET: Premium
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Premium()
        {
            return View();
        }



    }
}