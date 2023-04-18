using DataAccess.CRUD;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class StockProductoManager
    {
        public StockProductoManager() { 
            
        }


        public List<StockProductos> GetAllStockProductos()
        {
            var stockProductosCRUD = new StockProductosCrudFactory();
            List<StockProductos> stockProductos;
            
            stockProductos = stockProductosCRUD.RetrieveAll<StockProductos>();

            return stockProductos;

        }
        public Response AnadirProductoUsuario(StockProductos stockProductos)
        {
            var stockProductosCRUD = new StockProductosCrudFactory();

            try
            {
                stockProductosCRUD.Create(stockProductos);
            }

            catch (Exception ex)
            {
                return new Response("Error en la base de datos", ex.Message, ResponseType.ERROR);
            }

            return new Response("Producto añadido exitosamente", "Producto añadido exitosamente", ResponseType.SUCCESS);
        }

        public Response EliminarProductoUsuario(int IdUsuario, int IdProducto)
        {
            var stockProductoCRUD = new StockProductosCrudFactory();

            var stock = new StockProductos()
            {
                IdUsuario = IdUsuario,
                IdProducto = IdProducto
            };

            try
            {
                stockProductoCRUD.Delete(stock);
            }

            catch (Exception ex)
            {
                return new Response("Error en la base de datos", ex.Message, ResponseType.ERROR);
            }

            return new Response("Producto eliminado correctamente", "Producto eliminado correctamente", ResponseType.SUCCESS);
        }

        public Response ActualizarProductoUsuario(StockProductos stockProductos)
        {
            var stockProductoCRUD = new StockProductosCrudFactory();

            if (stockProductos.Cantidad < 0 || stockProductos.PrecioUnidad < 0)
            {
                new Response("Error en la entrada", "El numero no puede ser negativa", ResponseType.ERROR);
            }

            try
            {
                stockProductoCRUD.Update(stockProductos);
            }

            catch (Exception ex)
            {
                new Response("Error en la base de datos", ex.Message, ResponseType.ERROR);
            }

            return new Response("Producto actualizado exitosamente", "Producto actualizado exitosamente", ResponseType.ERROR);
        }

        public List<StockProductos> GetStockProductosByIdUsuario(int IdUsuario)
        {
            var stockProductoCRUD = new StockProductosCrudFactory();

            List<StockProductos> stockProductos = stockProductoCRUD.RetrieveAll<StockProductos>();

            List<StockProductos> stockProductosFiltrado = new List<StockProductos>();

            foreach (var prod in stockProductos)
            {
                if (prod.IdUsuario == IdUsuario)
                {
                    stockProductosFiltrado.Add(prod);
                }
            }

            return stockProductosFiltrado;
        }

        public StockProductos GetStockProductosById(int IdUsuario, int IdProducto)
        {
            var stockProductoCRUD = new StockProductosCrudFactory();

            List<StockProductos> stockProductos = stockProductoCRUD.RetrieveAll<StockProductos>();

            foreach (var prod in stockProductos)
            {
                if (prod.IdUsuario == IdUsuario && prod.IdProducto == IdProducto)
                {
                    return prod;
                }
            }

            return null;
        }
    }
}
