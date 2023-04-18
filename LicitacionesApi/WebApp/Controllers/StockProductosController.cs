using AppLogic;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}