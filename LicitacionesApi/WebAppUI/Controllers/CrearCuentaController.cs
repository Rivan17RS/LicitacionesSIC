using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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
        async public Task<ActionResult> CrearCuenta(Usuario usuario)
        {
            // crear usuario

            // llamar API

            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            var telefono = usuario.Telefono.Substring(4);
            var cedula = usuario.Identificacion.Replace(" ", "");

            string api = $"api/Usuario/CrearUsuario?nombre={usuario.Nombre}&apellidos={usuario.Apellidos}&identificacion={usuario.Identificacion}&telefono={usuario.Telefono}&correo={usuario.CorreoElectronico}&contrasena={usuario.Contrasena}";

            string urlFinal = UrlApi + api;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(urlFinal);

                //Llamamos al API que nos va retornar los datos

                var response = await client.PostAsync(urlFinal, new StringContent("", Encoding.UTF8, "application/json"));
                var responseContent = await response.Content.ReadAsStringAsync();

                var finalResponse =  DTO.Response.CreateResponse(responseContent);

                ViewBag.Message = "Usuario creado exitosamente";
                if (finalResponse != null)
                {
                    if (finalResponse.ResponseType == ResponseType.ERROR)
                    {
                        ViewBag.Error = finalResponse;
                    }
                }
                return RedirectToAction("ConfirmarRegistro");
                //return Content(responseContent, "application/json"); // Return the response content as a JSON string

            }
        }

        public ActionResult ConfirmarRegistro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ConfirmaRegistro()
        {
            return RedirectToAction("Index", "Home", new { area = "" });
        }
    }
}