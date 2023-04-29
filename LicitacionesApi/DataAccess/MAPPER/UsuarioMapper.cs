using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;
using DTO;
using System.Text.Json;


namespace DataAccess.MAPPER
{
    public class UsuarioMapper : ICrudStatements, IObjectMapper
    {


        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_CrearUsuario";

            var u = (Usuario) entyDTO;
            oper.AddVarcharParam("Nombre", u.Nombre);
            oper.AddVarcharParam("Apellidos", u.Apellidos);
            oper.AddVarcharParam("Identificacion", u.Identificacion);
            oper.AddVarcharParam("Telefono", u.Telefono);
            oper.AddVarcharParam("CorreoElectronico", u.CorreoElectronico);
            oper.AddIntegerParam("Estado", u.Estado);
            oper.AddVarcharParam("Otp", u.Otp);
            oper.AddIntegerParam("IdRol", u.Rol);
            oper.AddVarcharParam("Contrasena", u.Contrasena);

            oper.AddIntegerParam("IdUsrCreacion", u.IdUsrCreacion);

            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_EliminarUsuario";

            var u = (Usuario)entyDTO;
            oper.AddIntegerParam("Id", u.Id);
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerUsuarios"
            };
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement(Usuario usr)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerUsuariosFiltro"
            };

            oper.AddVarcharParam("Nombre", usr?.Nombre == "" ? null: usr?.Nombre);
            oper.AddVarcharParam("Apellidos", usr?.Apellidos == "" ? null : usr?.Apellidos);
            oper.AddVarcharParam("Identificacion", usr?.Identificacion == "" ? null : usr?.Identificacion);
            oper.AddVarcharParam("Telefono", usr?.Telefono == "" ? null : usr?.Telefono);
            oper.AddVarcharParam("CorreoElectronico", usr?.CorreoElectronico == "" ? null : usr?.CorreoElectronico);
            oper.AddIntegerParam("Estado", usr?.Estado ?? 2);
            oper.AddIntegerParam("IdRol", usr?.Rol ?? 0);

            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(string ID)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ObtenerUsuarioPorIdentificacion";

            oper.AddVarcharParam("Identificacion",ID);
            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ActualizarUsuario";

            var u = (Usuario)entyDTO;
            oper.AddIntegerParam("ID", u.Id);
            oper.AddVarcharParam("Nombre", u.Nombre);
            oper.AddVarcharParam("Apellidos", u.Apellidos);
            oper.AddVarcharParam("Identificacion", u.Identificacion);
            oper.AddVarcharParam("Telefono", u.Telefono);
            oper.AddVarcharParam("CorreoElectronico", u.CorreoElectronico);
            oper.AddVarcharParam("Contrasena", u.Contrasena);
            oper.AddIntegerParam("Estado", u.Estado);
            oper.AddIntegerParam("IdRol", u.Rol);
            oper.AddVarcharParam("Otp", u.Otp);
            oper.AddIntegerParam("IntentosFallidos", u.IntentosFallidos);
            oper.AddIntegerParam("IdUsrCreacion", u.IdUsrCreacion);
            oper.AddIntegerParam("IdUsrActualizacion", u.IdUsrActualizacion);
            oper.AddIntegerParam("IdUsrEliminacion", u.IdUsrEliminacion);
            oper.AddDateTimeParam("FechaCreacion", u.FechaCreacion);
            oper.AddDateTimeParam("FechaActualizacion", u.FechaActualizacion);
            oper.AddDateTimeParam("FechaEliminacion", u.FechaEliminacion);

            return oper;

        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var usuario = new Usuario()
            {
                Id = Convert.ToInt32(row["Id"]),
                Nombre = row["Nombre"].ToString(),
                Apellidos = row["Apellidos"].ToString(),
                Identificacion = row["Identificacion"].ToString(),
                Telefono = row["Telefono"].ToString(),
                CorreoElectronico = row["CorreoElectronico"].ToString(),
                Estado = Convert.ToInt32(row["Estado"]),
                Otp = row["Otp"].ToString(),
                Rol = Convert.ToInt32(row["IdRol"]),
                Contrasena = row["Contrasena"].ToString(),
                IntentosFallidos= Convert.ToInt32(row["IntentosFallidos"]),

                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]): 0 ,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32( row["IdUsrEliminacion"] ): 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]): new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]): new DateTime(1753, 1, 1, 0, 0, 0)
            };
            return usuario;
        }



        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var purchaseOrder = BuildObject(row);
                lstResults.Add(purchaseOrder);
            }
            return lstResults;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ObtenerUsuarioPorID";

            oper.AddIntegerParam("id", ID);
            
            return oper;
        }
    }
}
