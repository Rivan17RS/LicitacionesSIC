using DataAccess.CRUD;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class AdjudicacionManager
    {
        AdjudicacionesCrudFactory AdjudicacionesCrudFactory;

        public Response CrearAdjudicacion(Adjudicaciones adjudicaciones)
        {
            var response = new Response();

            try
            {
                AdjudicacionesCrudFactory = new AdjudicacionesCrudFactory();
                AdjudicacionesCrudFactory.Create(adjudicaciones);
                response = new Response("Creación de adjudicación éxitosa", "Creación de adjudicación éxitosa", ResponseType.SUCCESS);
            }
            catch (Exception ex)
            {
                response = new Response("Error de creación de adjudicación", ex.Message, ResponseType.ERROR);
            }

            return response;
        } 

        public Response ActualizarAdjudicacion(Adjudicaciones adjudicaciones)
        {
            var response = new Response();
            try
            {
                AdjudicacionesCrudFactory = new AdjudicacionesCrudFactory();
                AdjudicacionesCrudFactory.Update(adjudicaciones);
                response = new Response("Actualización de adjudicación éxitosa", "Actualización de adjudicación éxitosa", ResponseType.SUCCESS);
            }
            catch (Exception ex)
            {
                response = new Response("Error de actualización de adjudicación", ex.Message, ResponseType.ERROR);
            }
            return response;
        }

        public Response EliminarAdjudicacion(Adjudicaciones adjudicaciones)
        {
            var response = new Response();
            try
            {
                AdjudicacionesCrudFactory = new AdjudicacionesCrudFactory();
                AdjudicacionesCrudFactory.Delete(adjudicaciones);
                response = new Response("Eliminación de adjudicación éxitosa", "Eliminación de adjudicación éxitosa", ResponseType.SUCCESS);
            }
            catch (Exception ex)
            {
                response = new Response("Error de eliminación de adjudicación", ex.Message, ResponseType.ERROR);
            }
            return response;
        }

        public List<Adjudicaciones> ObtenerAdjudicaciones()
        {
            AdjudicacionesCrudFactory = new AdjudicacionesCrudFactory();
            return AdjudicacionesCrudFactory.RetrieveAll<Adjudicaciones>();
        }

        public Adjudicaciones ObtenerAdjudicacionPorId(int id)
        {
            AdjudicacionesCrudFactory = new AdjudicacionesCrudFactory();
            return AdjudicacionesCrudFactory.RetrieveByID<Adjudicaciones>(id);
        }
    }
}
