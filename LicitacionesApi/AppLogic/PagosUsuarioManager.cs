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
    public class PagosUsuarioManager
    {

        PagosUsuarioCrudFactory _factory = new PagosUsuarioCrudFactory();


        public Response CrearPagoUsuario( PagosUsuarios ps)
        {
            
            try
            {
                _factory.Create(ps);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo crear", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Pago creado exitosamente", ResponseType.SUCCESS);

        }

        public Response ActualizarPagoUsuario(PagosUsuarios ps)
        {

            try
            {
                _factory.Update(ps);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo actualizar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Pago Actualizado exitosamente", ResponseType.SUCCESS);

        }

        public Response EliminarPagoUsuario(int idPago)
        {
            PagosUsuarios ps = _factory.RetrieveByID<PagosUsuarios>(idPago);
            try
            {
                _factory.Delete(ps);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo eliminar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Pago eliminado exitosamente", ResponseType.SUCCESS);
        }


        public PagosUsuarios ObtenerPago(int id)
        {

            return _factory.RetrieveByID<PagosUsuarios>(id);
        }

        public List<PagosUsuarios> ObtenerPagosIdUser(int IdUser)
        {
            try
            {
                return _factory.RetrieveByUserID<PagosUsuarios>(IdUser);

            }

            catch (SqlException ex)
            {

                    return null;
               
            }
        }

        public List<PagosUsuarios> ObtenerPagos()
        {
            try
            {
                return _factory.RetrieveAll<PagosUsuarios>();

            }

            catch (SqlException ex)
            {

                return null;

            }
        }

        public List<PagosUsuarios> ObtenerPagos(PagosUsuarios p)
        {
            try
            {
                return _factory.RetrieveAll<PagosUsuarios>(p);

            }

            catch (SqlException ex)
            {

                return null;

            }
        }


    }
}
