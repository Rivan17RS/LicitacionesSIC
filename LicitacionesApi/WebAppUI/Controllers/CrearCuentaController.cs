using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace WebAppUI.Controllers
{
    public class CrearCuentaController : Controller
    {
        // GET: CrearCuenta
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CrearCuenta()
        {
            return View();
        }


        [HttpPost]
        public ActionResult CrearCuenta(Usuario usuario)
        {
            // crear usuario

            // llamar API

            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            string api = $"api/Usuario/CrearUsuario?nombre={usuario.Nombre}&apellidos={usuario.Apellidos}&identificacion={usuario.Identificacion}&telefono={usuario.Telefono}&correo={usuario.CorreoElectronico}&contrasena={usuario.Contrasena}";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();

            client.BaseAddress = new Uri(urlFinal);

            //Llamamos al API que nos va retornar los datos

            var response = client.PostAsync(urlFinal, new StringContent("", Encoding.UTF8, "application/json"));

            ViewBag.Message = "Usuario creado exitosamente";

            return View();
        }

        public ActionResult ConfirmarRegistro()
        {
            return View();
        }
    }
}