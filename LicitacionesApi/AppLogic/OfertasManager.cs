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
    public class OfertasManager
    {
        OfertasCrudFactory _factory = new OfertasCrudFactory();
        public Response CrearOfertas(Ofertas Of)
        {
            try
            {
                _factory.Create(Of);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo crear", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Oferta creada exitosamente", ResponseType.SUCCESS);

        }
        public Response ActualizarOfertas(Ofertas Of)
        {

            try
            {
                _factory.Update(Of);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo actualizar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Oferta actualizada exitosamente", ResponseType.SUCCESS);

        }
        public Response EliminarOfertas(int IdOferta)
        {
            Ofertas Of = _factory.RetrieveByIdOferta<Ofertas>(IdOferta);
            try
            {
                _factory.Delete(Of);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo eliminar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Oferta eliminada exitosamente", ResponseType.SUCCESS);
        }

        public Ofertas ObtenerOfertasPorId(int Id)
        {
            return _factory.RetrieveByIdOferta<Ofertas>(Id);
        }
        public Ofertas ObtenerOfertasPorIdOferta(int IdOferta)
        {
            return _factory.RetrieveByIdOferta<Ofertas>(IdOferta);
        }
        public Ofertas ObtenerOfertasPorIdLicitacion(int IdLicitacion)
        {
            return _factory.RetrieveByIdOferta<Ofertas>(IdLicitacion);
        }

        public List<Ofertas> ObtenerOfertas()
        {
            try
            {
                return _factory.RetrieveAll<Ofertas>();
            }
            catch (SqlException ex)
            {
                return null;
            }
        }
    }
}
