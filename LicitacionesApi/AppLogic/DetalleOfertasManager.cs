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
    public class DetalleOfertasManager
    {
        DetalleOfertasCrudFactory _factory = new DetalleOfertasCrudFactory();

        public Response CrearDetalleOfertas(DetalleOfertas DeOf)
        {
            try
            {
                _factory.Create(DeOf);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo crear", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Producto agregado a la oferta exitosamente", ResponseType.SUCCESS);

        }
        public Response ActualizarDetalleOfertas(DetalleOfertas DeOf)
        {

            try
            {
                _factory.Update(DeOf);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo actualizar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Producto en oferta actualizado exitosamente", ResponseType.SUCCESS);

        }
        public Response EliminarDetalleOfertas(int IdOferta)
        {
            DetalleOfertas DeOf = _factory.RetrieveByIdOferta<DetalleOfertas>(IdOferta);
            try
            {
                _factory.Delete(DeOf);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo eliminar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Producto en oferta eliminado exitosamente", ResponseType.SUCCESS);
        }
        public DetalleOfertas ObtenerDetalleOfertasPorId(int IdOferta)
        {
            return _factory.RetrieveByIdOferta<DetalleOfertas>(IdOferta);
        }

        public List<DetalleOfertas> ObtenerDetalleOfertas()
        {
            try
            {
                return _factory.RetrieveAll<DetalleOfertas>();
            }
            catch (SqlException ex)
            {
                return null;
            }
        }
    }
}
