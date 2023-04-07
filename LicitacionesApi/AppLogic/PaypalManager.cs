//using System;
//using System.Collections.Generic;
//using System.Configuration;
//using System.Globalization;
//using System.Net;
//using System.Threading.Tasks;
//using Newtonsoft.Json;
//using PayPalCheckoutSdk.Core;
//using PayPalCheckoutSdk.Orders;
//using PayPalCheckoutSdk.Payments;
//using PayPalHttp;

//namespace AppLogic
//{
//    public class PaypalManager
//    {
//        private readonly PayPalHttpClient _client;

//        public PaypalManager()
//        {
//            string clientId = ConfigurationManager.AppSettings["PayPal.ClientId"];
//            string clientSecret = ConfigurationManager.AppSettings["PayPal.ClientSecret"];
//            _client = new PayPalHttpClient(new SandboxEnvironment(clientId, clientSecret));
//        }

//        public async Task<Order> CreateOrderAsync(decimal amount, string currencyCode)
//        {
//            var request = new OrdersCreateRequest();
//            request.Prefer("return=representation");
//            request.RequestBody(BuildRequestBody(amount, currencyCode));
//            var response = await _client.Execute(request);
//            return response.Result<Order>();
//        }

//        public async Task<HttpResponse> CaptureOrderAsync(string orderId)
//        {
//            var request = new OrdersCaptureRequest(orderId);
//            request.RequestBody(new OrderActionRequest());
//            return await _client.Execute(request);
//        }



//        private static OrderRequest BuildRequestBody(decimal amount, string currencyCode)
//        {
//            var orderRequest = new OrderRequest
//            {
//                CheckoutPaymentIntent = "CAPTURE",
//                PurchaseUnits = new List<PurchaseUnitRequest>
//        {
//            new PurchaseUnitRequest
//            {
//                AmountWithBreakdown = new AmountWithBreakdown
//                {
//                    CurrencyCode = currencyCode,
//                    Value = amount.ToString(CultureInfo.InvariantCulture)
//                }
//            }
//        }
//            };

//            return orderRequest;
//        }

//    }
//}

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Net;
using System.Threading.Tasks;
using DTO;
using Newtonsoft.Json;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalCheckoutSdk.Payments;
using PayPalHttp;

namespace AppLogic
{
    public class PaypalManager
    {
        private readonly PayPalHttpClient _client;

        public PaypalManager()
        {
            string clientId = ConfigurationManager.AppSettings["PayPal.ClientId"];
            string clientSecret = ConfigurationManager.AppSettings["PayPal.ClientSecret"];
            _client = new PayPalHttpClient(new SandboxEnvironment(clientId, clientSecret));
        }

        public async Task<Order> CreateOrderAsync(decimal amount, string currencyCode)
        {
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(BuildRequestBody(amount, currencyCode));
            var response = await _client.Execute(request);
            return response.Result<Order>();
        }

        public async Task<HttpResponse> CaptureOrderAsync(string orderId)
        {
            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());
            var response = await _client.Execute(request);
            return response;
        }

        public async Task<OrderPaypal> CreateOrderPaypalAsync(decimal amount, string currencyCode)
        {
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(BuildRequestBody(amount, currencyCode));
            var response = await _client.Execute(request);
            var order = response.Result<Order>();
            return new OrderPaypal
            {
                Id = order.Id,
                Amount = decimal.Parse(order.PurchaseUnits[0].AmountWithBreakdown.Value),
                CurrencyCode = order.PurchaseUnits[0].AmountWithBreakdown.CurrencyCode
            };
        }

        private static OrderRequest BuildRequestBody(decimal amount, string currencyCode)
        {
            var orderRequest = new OrderRequest
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
        {
            new PurchaseUnitRequest
            {
                AmountWithBreakdown = new AmountWithBreakdown
                {
                    CurrencyCode = currencyCode,
                    Value = amount.ToString(CultureInfo.InvariantCulture)
                }
            }
        }
            };

            return orderRequest;
        }

    }
}




