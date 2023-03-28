﻿using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;

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
            // retornar a la pagina anterior (necesito trabajar en una manera de generalizar mejor esto
            return Redirect(((Uri)Session["LastPage"]).ToString());
        }

        public ActionResult IniciodeSesion()
        {
            Session["LastPage"] = System.Web.HttpContext.Current.Request.UrlReferrer;

            return View();
        }

        [HttpPost]
        public ActionResult IniciodeSesion(Usuario usuario)
        {

            if (usuario.CorreoElectronico == null || usuario.Contrasena == null)
            {
                return View();
            }

            // llamar API
            string UrlApi = "https://localhost:44369/";

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

                // guardar los datos en sesion
                Session["CurrentUser"] = dataObject.CorreoElectronico;
                Session["User"] = dataObject.Nombre;
            }
            else
                return View();

            return RedirectToAction("GoBack");

        }

        public ActionResult CierredeSesion()
        {
            Session["CurrentUser"] = null;
            Session["User"] = null;
            return RedirectToAction("GoBack");
        }

        [HttpPost]
        public ActionResult RecuperarContrasena(Usuario usuario)
        {
            string UrlApi = "https://localhost:44369/";

            string api = $"api/Usuario/EnviarCorreoRecuperacion?correo={usuario.CorreoElectronico}";

            string urlFinal = UrlApi + api;

            var client = new HttpClient();

            client.BaseAddress = new Uri(urlFinal);

            var response = client.PostAsync(urlFinal, new StringContent("", Encoding.UTF8, "application/json"));

            return null;
        }

        public ActionResult RecuperarContrasena()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CrearContrasenaNueva(string correo, string codigo)
        {
            string UrlApi = "https://localhost:44369/";

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

                    return View();
                }

                else
                {
                    return RedirectToAction("IniciodeSesion");
                }
            }

            else
            {
                return RedirectToAction("IniciodeSesion");
            }
        }

        public ActionResult Cancel()
        {
            return View();
        }

    }
}