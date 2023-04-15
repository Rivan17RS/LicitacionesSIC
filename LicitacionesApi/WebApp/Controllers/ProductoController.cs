using AppLogic;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class ProductoController : ApiController
    {
        ProductoManager pm = new ProductoManager();

        [HttpPost]
        public Response CrearProducto(Producto prod)
        {
            return pm.CrearProducto(prod);
        }

        [HttpGet]

        public Producto ObtenerProducto(int id)
        {
            return pm.ObtenerProducto(id);
        }

        public Response ActualizarProducto(Producto prod)
        {
            return pm.ActualizarProducto(prod);
        }

        [HttpPost]

        public string EliminarProducto(int id)
        {
            return pm.EliminarProducto(id);
        }

        [HttpGet]

        public List<Producto> ObtenerProductos()
        {
            return pm.ObtenerProductos();
        }
        [HttpPost]
        public List<Producto> ObtenerProductosFiltro(Producto producto)
        {
            return pm.ObtenerProductos(producto);
        }

    }
}
