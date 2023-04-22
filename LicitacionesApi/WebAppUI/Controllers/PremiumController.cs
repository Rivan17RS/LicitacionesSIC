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


        [HttpPost]
        public ActionResult Configuracion(Subscripcion subscripcion)
        {
      
            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            string api = $"api/Premium/CrearPremium";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();
            client.BaseAddress = new Uri(urlFinal);

            //Llamamos al API que nos va retornar los datos
            var result = client.GetAsync(urlFinal).Result;
            var jsonObject = result.Content.ReadAsStringAsync().Result;

            var dataObject = JsonConvert.DeserializeObject<Subscripcion>(jsonObject);

            Session["Premium"] = dataObject.PrecioMensual;
            Session["NombrePlan"] = dataObject.Nombre;

            return View();
        }
    }
}