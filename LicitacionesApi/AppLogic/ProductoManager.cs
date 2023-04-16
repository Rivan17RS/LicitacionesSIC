using DataAccess.CRUD;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class ProductoManager
    {
        ProductoCrudFactory pcf = new ProductoCrudFactory();
        Validaciones v = new Validaciones();

        public Response CrearProducto(Producto p)
        {
            if (!v.ValidTexto(p.Nombre))
            {
                return new Response("Error de entrada", "El formato del nombre es incorrecto", ResponseType.ERROR);
            }
            if (!v.ValidarNumero(Convert.ToDouble(p.Precio))){
                return new Response("Error de entrada", "El valor debe ser mayor a 0", ResponseType.ERROR);
            }
            if (!v.ValidarNumeroPositivo(p.StockCantidad))
            {
                return new Response("Error de entrada", "El valor debe ser mayor o igual a 0", ResponseType.ERROR);
            }
            var prod = new Producto
            {
                Nombre = p.Nombre,
                Descripcion= p.Descripcion,
                Precio = p.Precio,
                StockCantidad = p.StockCantidad,
                IdUsrCreacion = p.IdUsrCreacion
            };

            try
            {
                pcf.Create(prod);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada","No se pudo crear", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Producto creado exitosamente", ResponseType.SUCCESS);
        }


        public Producto ObtenerProducto(int id)
        {
            ProductoCrudFactory ucf = new ProductoCrudFactory();
            return pcf.RetrieveByID<Producto>(id);
        }

        public Response ActualizarProducto(Producto p)
        {
            Producto prod = pcf.RetrieveByID<Producto>(p.Id);
            if (!v.ValidTexto(p.Nombre))
            {
                return new Response("Error de entrada", "El formato del nombre es incorrecto", ResponseType.ERROR);
            }
            if (!v.ValidarNumero(Convert.ToDouble(p.Precio)))
            {
                return new Response("Error de entrada", "El valor debe ser mayor a 0", ResponseType.ERROR);
            }
            if (!v.ValidarNumeroPositivo(p.StockCantidad))
            {
                return new Response("Error de entrada", "El valor debe ser mayor o igual a 0", ResponseType.ERROR);
            }


            prod.Nombre = p.Nombre;
            prod.Descripcion = p.Descripcion;
            prod.Precio = p.Precio;
            prod.StockCantidad = p.StockCantidad;
            prod.IdUsrActualizacion = p.IdUsrActualizacion;
 

            try
            {
                pcf.Update(prod);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo crear", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Producto Actualizado exitosamente", ResponseType.SUCCESS);
        }

        public string EliminarProducto (int Id)
        {
            Producto prod = pcf.RetrieveByID<Producto>(Id);
            if (prod == null)
            {
                return "El Producto no Existe";
            }
            pcf.Delete(prod);
            return "Producto Eliminado";
        }

        public List<Producto> ObtenerProductos(Producto p)
        {

            return pcf.RetrieveAll<Producto>(p);
        }

        public List<Producto> ObtenerProductos()
        {

            return pcf.RetrieveAll<Producto>();
        }


    }
}
