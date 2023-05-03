using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.CRUD;
using DTO;
using System.Data.SqlClient;

namespace AppLogic
{
    public class RoleManager
    {
        RoleCrudFactory rcf = new RoleCrudFactory();
        Validaciones v = new Validaciones();

        public Response CrearRole(Roles r)
        {
            if (!v.ValidTexto(r.Nombre))
            {
                return new Response("Error de entrada", "El formato del nombre es incorrecto", ResponseType.ERROR);
            }

            var rol = new Roles
            {
                Nombre = r.Nombre,
                Estado = r.Estado,
                IdUsrCreacion = r.IdUsrCreacion
 
            };

            try
            {
                rcf.Create(rol);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo crear", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Role creado exitosamente", ResponseType.SUCCESS);
        }

        public Roles ObtenerRoleId(int Id) 
        { 
            return rcf.RetrieveByID<Roles>(Id);
        }

        public Response ActualizarRole (Roles r) 
        {
            Roles rol = rcf.RetrieveByID<Roles>(r.Id);
            if (!v.ValidTexto(r.Nombre))
            {
                return new Response("Error de entrada", "El formato del nombre es incorrecto", ResponseType.ERROR);
            }

            rol.Nombre = r.Nombre;
            rol.Estado = r.Estado;
            rol.IdUsrActualizacion = r.IdUsrActualizacion;
        
            try
            {
                rcf.Update(rol);
            }
            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo crear", ResponseType.ERROR);
}
            }
            return new Response("Success", "Role actualizado exitosamente", ResponseType.SUCCESS);

        }

        public string EliminarRole (int Id) 
        {
            Roles rol = rcf.RetrieveByID<Roles>(Id);
            if (rol == null)
            {
                return "El Producto no Existe";
            }
            rcf.Delete(rol);
            return "Producto Eliminado";
        }

        public List<Roles> ObtenerRoles() 
        {
            return rcf.RetrieveAll<Roles>();
        }

    }
}
