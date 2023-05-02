using DataAccess.CRUD;
using DataAccess.MAPPER;
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

        public Response CrearDetalleOfertas(DetalleOfertas detalleOfertas)
        {
            try
            {
                _factory.Create(detalleOfertas);
                return new Response("Success", "Producto agregado a la oferta exitosamente", ResponseType.SUCCESS);

            }
            catch (SqlException ex)
            {
                return new Response("Error en la creacion del detalle de oferta", ex.Message , ResponseType.ERROR);
            }

        }
        public Response ActualizarDetalleOfertas(DetalleOfertas detalleOfertas)
        {

            try
            {
                _factory.Update(detalleOfertas);
                return new Response("Success", "Producto en oferta actualizado exitosamente", ResponseType.SUCCESS);
            }

            catch (SqlException ex)
            {
                return new Response("Error en la actualizacion del detalle de oferta", ex.Message, ResponseType.ERROR);
            }

        }
        public Response EliminarDetalleOfertas(DetalleOfertas detalleOfertas)
        {
            try
            {
                _factory.Delete(detalleOfertas);
                return new Response("Success", "Producto en oferta eliminado exitosamente", ResponseType.SUCCESS);
            }
            catch (SqlException ex)
            {
                return new Response("Error, no se pudo eliminar", ex.Message, ResponseType.ERROR);
            }
        }
        public List<DetalleOfertas> ObtenerDetalleOfertasPorId(int IdOferta)
        {
            return _factory.RetrieveAllByOferta<DetalleOfertas>(IdOferta);
        }

        public List<DetalleOfertas> ObtenerDetalleOfertas()
        {
            return _factory.RetrieveAll<DetalleOfertas>();
        }
    }
}
