using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Diagnostics;
using ZXing;

namespace WebAppUI.Controllers
{
    public class IniciarSesionController : Controller
    {
        // GET: IniciarSesion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GoBack()
        {
            if (Session["LastPage"] == null)
            {
                return RedirectToAction("Index", "Home");
            }
            // retornar a la pagina anterior (necesito trabajar en una manera de generalizar mejor esto
            return Redirect(((Uri)Session["LastPage"]).ToString());
        }

        public ActionResult IniciarSesion()
        {
            Session["LastPage"] = System.Web.HttpContext.Current.Request.UrlReferrer;

            return View();
        }

        [HttpPost]
        public ActionResult IniciarSesion(Usuario usuario)
        {

            if (usuario.CorreoElectronico == null || usuario.Contrasena == null)
            {
                return View();
            }

            // llamar API
            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            string api = $"api/Usuario/ValidareIniciarSesion?correo={usuario.CorreoElectronico}&contrasena={usuario.Contrasena}";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();
            client.BaseAddress = new Uri(urlFinal);

            //Llamamos al API que nos va retornar los datos
            var result = client.GetAsync(urlFinal).Result;

            if (result.IsSuccessStatusCode)
            {

                var jsonObject = result.Content.ReadAsStringAsync().Result;

                var dataObject = JsonConvert.DeserializeObject<Usuario>(jsonObject);


                if (dataObject == null)
                {
                    ViewBag.UserFound = false;
                    return View();
                }

                if (dataObject.Estado == 0)
                {
                    ViewBag.UserFound = false;
                    return View();
                }
                // guardar los datos en sesion para uso general
                Session["Id"] = dataObject.Id;
                Session["CurrentUser"] = dataObject.CorreoElectronico;
                Session["User"] = dataObject.Nombre;
                Session["UserLastName"] = dataObject.Apellidos;
                Session["UserTel"] = dataObject.Telefono;
                Session["UserId"] = dataObject.Identificacion;
                Session["UserOtp"] = dataObject.Otp;
                Session["PasswordHashed"] = dataObject.Contrasena;
                
                var Rol = dataObject.Rol;
                switch (Rol)
                {
                    case 1:
                        Session["Role"] = "Administrador";
                        break;
                    case 2:
                        Session["Role"] = "Analista";
                        break;
                    case 3:
                        Session["Role"] = "Usuario";
                        break;
                    case 4:
                        Session["Role"] = "Premium";
                        break;
                    default:
                        Session["Role"] = "Usuario";
                        break;
                }

                return RedirectToAction("GoBack");
            }

            else
            {
                return RedirectToAction("ErrorMessage", "Messages", new { message = "API Error: " + result.ToString() });
            }

        }

        public ActionResult CerrarSesion()
        {
            Session["CurrentUser"] = null;
            Session["User"] = null;
            Session["Role"] = null;
            return RedirectToAction("GoBack");
        }

        [HttpPost]
        public ActionResult RecuperarContrasena(Usuario usuario)
        {
            Session["LastPage"] = System.Web.HttpContext.Current.Request.UrlReferrer;
            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            string api = $"api/Usuario/EnviarCorreoRecuperacion?correo={usuario.CorreoElectronico}";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();

            client.BaseAddress = new Uri(urlFinal);

            var response = client.PostAsync(urlFinal, new StringContent("", Encoding.UTF8, "application/json"));

            ViewBag.RecoveryEmailSent = "Sent";

            return View();
        }

        public ActionResult RecuperarContrasena()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CrearContrasenaNueva(string correo, string codigo)
        {
            Session["LastPage"] = System.Web.HttpContext.Current.Request.UrlReferrer;
            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            string api = $"api/Usuario/ValidarCodigoRecuperacion?correo={correo}&codigo={codigo}";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();
            client.BaseAddress = new Uri(urlFinal);

            //Llamamos al API que nos va retornar los datos
            var result = client.GetAsync(urlFinal).Result;

            if (result.IsSuccessStatusCode)
            {
                var responseContent = result.Content.ReadAsStringAsync().Result;

                bool succesful = bool.Parse(responseContent);

                if (succesful)
                {
                    Session["CurrentUserToUpdate"] = correo;
                    return View();
                }

                else
                {
                    return RedirectToAction("IniciarSesion");
                }
            }

            else
            {
                return RedirectToAction("IniciarSesion");
            }
        }

        [HttpPost]
        public ActionResult CrearContrasenaNuevaForm(string contrasena, string contrasenaTwice)
        {
            string UrlApi = "https://licitaciones-api.azurewebsites.net/";

            string api = $"api/Usuario/CambiarContrasena?correo={Session["CurrentUserToUpdate"]}&contrasenanueva={contrasena}";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();

            Debug.WriteLine(urlFinal);

            client.BaseAddress = new Uri(urlFinal);

            var response = client.PostAsync(urlFinal, new StringContent("", Encoding.UTF8, "application/json"));

            return RedirectToAction("Index", "Home", new { area="" });
        }
        public ActionResult Cancel()
        {
            return View();
        }
    }
}