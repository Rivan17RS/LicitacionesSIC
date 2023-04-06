//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Text;
//using System.Threading.Tasks;
//using System.Web;
//using System.Web.Http;
//using AppLogic;
//using PayPalCheckoutSdk.Core;
//using PayPalCheckoutSdk.Orders;


//namespace WebApp.Controllers
//{
//    public class PaypalController : ApiController
//    {
//        private readonly PaypalManager _paypalManager;
//        private HttpClient _client = new HttpClient();

//        public PaypalController()
//        {
//            _paypalManager = new PaypalManager();
//        }

//        [HttpGet]
//        public async Task<Order> CreateOrderAsync(decimal amount, string currencyCode)
//        {
//            return await _paypalManager.CreateOrderAsync(amount, currencyCode);
//        }

//        [HttpPost]
//        public async Task<HttpResponseMessage> CaptureOrderAsync([FromBody] string orderId)
//        {
//            var request = new OrdersCaptureRequest(orderId);
//            request.RequestBody(new OrderActionRequest());
//            var response = await _client.SendAsync(request);
//            var content = await response.Content.ReadAsStringAsync();
//            return new HttpResponseMessage(response.StatusCode)
//            {
//                Content = new StringContent(content, Encoding.UTF8, "application/json")
//            };
//        }



//    }
//}

using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AppLogic;
using PayPalCheckoutSdk.Orders;

namespace WebApp.Controllers
{
    public class PaypalController : ApiController
    {
        private readonly PaypalManager _paypalManager;
        private HttpClient _client = new HttpClient();

        public PaypalController()
        {
            _paypalManager = new PaypalManager();
        }

        [HttpGet]
        public async Task<Order> CreateOrderAsync(decimal amount, string currencyCode)
        {
            return await _paypalManager.CreateOrderAsync(amount, currencyCode);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> CaptureOrderAsync([FromBody] string orderId)
        {
            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());
            var response = await _client.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();
            return new HttpResponseMessage(response.StatusCode)
            {
                Content = new StringContent(content, Encoding.UTF8, "application/json")
            };
        }
    }
}

