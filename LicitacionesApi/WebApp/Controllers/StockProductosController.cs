using AppLogic;
using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web;
using System.Web.Http;
using ZXing.OneD;

namespace WebApp.Controllers
{
    public class StockProductosController : ApiController
    {
        StockProductoManager stockProductoManager = new StockProductoManager();

        [HttpPost]
        // create stockproductos
        public Response AnadirProductoUsuario(StockProductos stock)
        {
            return stockProductoManager.AnadirProductoUsuario(stock);
        }

        [HttpPost]
        public Response EliminarProductoUsuario(int IdUsuario, int IdProducto)
        {
            StockProductoManager stockProductoManager = new StockProductoManager();

            var stock = new StockProductos()
            {
                IdUsuario = IdUsuario,
                IdProducto = IdProducto
            };

            return stockProductoManager.EliminarProductoUsuario(IdUsuario, IdProducto);
        }

        [HttpPost]
        public Response ActualizarProductoUsuario(StockProductos stockProductos)
        {
            StockProductoManager stockProductoManager = new StockProductoManager();

            return stockProductoManager.ActualizarProductoUsuario(stockProductos);
        }

        [HttpGet]
        public List<StockProductos> GetAllStockProductos()
        {
            StockProductoManager stockProductoManager = new StockProductoManager();

            return stockProductoManager.GetAllStockProductos();
        }

        public List<ProductoDetailsResponse> GetProductoDetailsFromUser(string userIdentificacion)
        {
            var finalURL = "https://licitaciones-api.azurewebsites.net/api/usuario/obtenerusuario?id=" + userIdentificacion;

            var client = new HttpClient();

            Usuario userObject;

            List<Producto> productosObject = null;

            List<ProductoDetailsResponse> productos = new List<ProductoDetailsResponse>();

            client.BaseAddress = new Uri(finalURL);

            var result = client.GetAsync(finalURL).Result;

            if (result.IsSuccessStatusCode)
            {
                var jsonObject = result.Content.ReadAsStringAsync().Result;

                userObject = JsonConvert.DeserializeObject<Usuario>(jsonObject);

                if (userObject == null)
                {
                    throw new Exception("No se encontró usuario");
                }

                finalURL = "https://licitaciones-api.azurewebsites.net/api/producto/obtenerproductos";

                client = new HttpClient();

                client.BaseAddress = new Uri(finalURL);

                result = client.GetAsync(finalURL).Result;

                if (result.IsSuccessStatusCode)
                {
                    var jsonObjects = result.Content.ReadAsStringAsync().Result;

                    productosObject = JsonConvert.DeserializeObject<List<Producto>>(jsonObjects);

                    if (productosObject == null)
                    {
                        throw new Exception("Error en el controller productos");
                    }

                }

                var stockproductos = GetAllStockProductos();

                foreach (var item in stockproductos)
                {

                    if (item.IdUsuario == userObject.Id)
                    {
                        foreach (var product in productosObject)
                        {
                            if (item.IdProducto == product.Id)
                            {
                                productos.Add(new ProductoDetailsResponse()
                                {
                                    IdUsuario = item.IdUsuario,
                                    IdProducto = item.IdProducto,
                                    Nombre = product.Nombre,
                                    Descripcion = product.Descripcion,
                                    Cantidad = item.Cantidad,
                                    PrecioUnidad = item.PrecioUnidad
                                });
                            }
                        }
                    }
                }


            }

            return productos;
        }
    }
}