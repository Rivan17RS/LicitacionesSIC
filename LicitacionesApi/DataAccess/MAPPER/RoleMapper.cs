using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;
using DTO;

namespace DataAccess.MAPPER
{
    public class RoleMapper : ICrudStatements, IObjectMapper
    {


        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_CrearRoles";

            var rol = (Roles)entyDTO;
            oper.AddIntegerParam("IdUsrCreacion", rol.IdUsrCreacion);
            oper.AddVarcharParam("Nombre", rol.Nombre);
            oper.AddIntegerParam("Estado", rol.Estado);
            //oper.AddDateTimeParam("FechaCreacion", DateTime.Now);

            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_EliminarRoles";

            var rol = (Roles)entyDTO;
            oper.AddIntegerParam("Id", rol.Id);
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerRoles"
            };
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerRolesId"
            };
            oper.AddIntegerParam("Id", ID);

            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ActualizarRoles";

            var rol = (Roles)entyDTO;
            oper.AddIntegerParam("Id", rol.Id);
            oper.AddVarcharParam("Nombre", rol.Nombre);
            oper.AddIntegerParam("Estado", rol.Estado);
            oper.AddIntegerParam("IdUsrActualizacion", rol.IdUsrActualizacion);
            return oper;
        }



        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var Roles = new Roles()
            {
                Id = Convert.ToInt32(row["Id"]),
                Nombre = Convert.ToString(row["Nombre"]),
                Estado = Convert.ToInt32(row["Estado"]),

                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)


            };
            return Roles;
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


    }
}
