using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebAppUI.Model.Paypal_Order;
using WebAppUI.Model.Paypal_Transaction;

namespace WebAppUI.Controllers
{
    public class PaypalController : Controller
    {
        // GET: Paypal
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> About()
        {

            //id de la autorizacion para obtener el dinero
            string token = Request.QueryString["token"];

            bool status = false;


            using (var client = new HttpClient())
            {

                //credenciales de api paypal
                var userName = "AcuboGNgITO4-BLXemm6Jy7fIEQCP5LgIYycRgH7uLuSaT7P06IBBX6TYelDB1_BK5tQy5H_mIXdgvXO";
                var passwd = "EPB26gXxEMOZBJBqXWGzaIrjuJawpimeL-HWOQ5YcjbRizR9Ytupoha1tl13gEU48slxwy9fAwkT4vsQ";

                client.BaseAddress = new Uri("https://api-m.sandbox.paypal.com");

                var authToken = Encoding.ASCII.GetBytes($"{userName}:{passwd}");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));

                var data = new StringContent("{}", Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync($"/v2/checkout/orders/{token}/capture", data);


                status = response.IsSuccessStatusCode;

                ViewData["Status"] = status;
                if (status)
                {
                    var jsonRespuesta = response.Content.ReadAsStringAsync().Result;

                    PaypalTransaction objeto = JsonConvert.DeserializeObject<PaypalTransaction>(jsonRespuesta);

                    ViewData["IdTransaccion"] = objeto.purchase_units[0].payments.captures[0].id;
                }

            }


            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        //public JsonResult Paypal(string precio) ---> EDITAR POR LA LINEA DE ABAJO
        public async Task<JsonResult> Paypal(string precio, string producto)
        {



            bool status = false;
            string respuesta = string.Empty;

            using (var client = new HttpClient())
            {

                var userName = "AcuboGNgITO4-BLXemm6Jy7fIEQCP5LgIYycRgH7uLuSaT7P06IBBX6TYelDB1_BK5tQy5H_mIXdgvXO";
                var passwd = "EPB26gXxEMOZBJBqXWGzaIrjuJawpimeL-HWOQ5YcjbRizR9Ytupoha1tl13gEU48slxwy9fAwkT4vsQ";

                client.BaseAddress = new Uri("https://api-m.sandbox.paypal.com");

                var authToken = Encoding.ASCII.GetBytes($"{userName}:{passwd}");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));


                var orden = new PaypalOrder()
                {
                    intent = "CAPTURE",
                    purchase_units = new List<Model.Paypal_Order.PurchaseUnit>() {

                        new Model.Paypal_Order.PurchaseUnit() {

                            amount = new Model.Paypal_Order.Amount() {
                                currency_code = "USD",
                                value = precio
                            },
                            description = producto
                        }
                    },
                    application_context = new ApplicationContext()
                    {
                        brand_name = "Mi Tienda",
                        landing_page = "NO_PREFERENCE",
                        user_action = "PAY_NOW", //Accion para que paypal muestre el monto de pago
                        return_url = "https://localhost:44304/Premium/Premium",// cuando se aprovo la solicitud del cobro
                        cancel_url = "https://localhost:44304/Premium/Premium"// cuando cancela la operacion
                    }
                };


                var json = JsonConvert.SerializeObject(orden);
                var data = new StringContent(json, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync("/v2/checkout/orders", data);


                status = response.IsSuccessStatusCode;


                if (status)
                {
                    respuesta = response.Content.ReadAsStringAsync().Result;
                }



            }

            return Json(new { status = status, respuesta = respuesta }, JsonRequestBehavior.AllowGet);

        }
    }
}