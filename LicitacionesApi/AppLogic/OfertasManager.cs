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
        public Response CrearOfertas(Ofertas ofertas)
        {
            try
            {
                _factory.Create(ofertas);
                return new Response("Success", "ofertas creada exitosamente", ResponseType.SUCCESS);
            }
            catch (SqlException ex)
            {
                return new Response("Error en la entrada, no se pudo crear", ex.Message , ResponseType.ERROR);
            }

        }
        public Response ActualizarOfertas(Ofertas ofertas)
        {

            try
            {
                _factory.Update(ofertas);
                return new Response("Success", "ofertas actualizada exitosamente", ResponseType.SUCCESS);
            }

            catch (SqlException ex)
            {
                return new Response("Error en la entrada, no se pudo actualizar", ex.Message, ResponseType.ERROR);
            }
        }
        public Response EliminarOfertas(Ofertas ofertas)
        {
            try
            {
                _factory.Delete(ofertas);
                return new Response("Success", "ofertas eliminada exitosamente", ResponseType.SUCCESS);
            }
            catch (SqlException ex)
            {
                return new Response("Error en la entrada, no se pudo eliminar", ex.Message, ResponseType.ERROR);
            }
        }

        public Ofertas ObtenerOfertasPorId(int Id)
        {
            return _factory.RetrieveByIdOferta<Ofertas>(Id);
        }
        public Ofertas ObtenerOfertasPorIdOferta(int IdOferta)
        {
            return _factory.RetrieveByIdOferta<Ofertas>(IdOferta);
        }
        public List<Ofertas> ObtenerOfertasPorIdLicitacion(int IdLicitacion)
        {
            return _factory.RetrieveByLicitacion<Ofertas>(IdLicitacion);
        }

        public List<Ofertas> ObtenerOfertas()
        {
            return _factory.RetrieveAll<Ofertas>();
        }
    }
}
