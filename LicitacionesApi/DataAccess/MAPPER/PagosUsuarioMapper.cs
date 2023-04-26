using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class PagosUsuarioMapper : ICrudStatements, IObjectMapper
    {

        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_CrearPago"
            };

            var p = (PagosUsuarios) entyDTO;
            oper.AddIntegerParam("IdUsuario", p.IdUsuario);
            oper.AddDecimalParam("Monto", p.Monto);
            oper.AddIntegerParam("Estado", p.Estado);
            oper.AddVarcharParam("Descripcion", p.Descripcion);
            oper.AddIntegerParam("IdUserCreacion", p.IdUsrCreacion);
            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_EliminarPago"
            };
            var p = (PagosUsuarios)entyDTO;
            oper.AddIntegerParam("IdPago", p.Id);

            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerPagos"
            };

            return oper;
        }

        public SqlOperation GetRetrieveAllStatementFilter(PagosUsuarios p)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerPagosUsuariosFiltro"

            };
            oper.AddIntegerParam("IdUsuario", p.IdUsuario);
            oper.AddDecimalParam("Monto", p.Monto);
            oper.AddVarcharParam("Descripcion", p?.Descripcion=="" ? null : p?.Descripcion);
            oper.AddDateTimeParam("FechaCreacion", p.FechaCreacion == new DateTime(1, 1, 1, 0, 0, 0) ? new DateTime(1753, 1, 1, 0, 0, 0): p.FechaCreacion);

            return oper;
        }

        public SqlOperation GetRetrieveByIDUserStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerPagosId"
            };
            oper.AddIntegerParam("IdUser", ID);

            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ActualizarPago"
            };

            var p = (PagosUsuarios)entyDTO;
            oper.AddIntegerParam("IdPago", p.Id);
            oper.AddIntegerParam("IdUsuario", p.IdUsuario);
            oper.AddDecimalParam("Monto", p.Monto);
            oper.AddIntegerParam("Estado", p.Estado);
            oper.AddVarcharParam("Descripcion", p.Descripcion);
            oper.AddIntegerParam("IdUsrActualizacion", p.IdUsrActualizacion);
            return oper;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var p = new PagosUsuarios()
            {
                Id = Convert.ToInt32(row["Id"]),
                IdUsuario = Convert.ToInt32(row["IdUsuario"]),
                Monto = Convert.ToDecimal(row["Monto"]),
                Estado = Convert.ToInt32(row["Estado"]),
                Descripcion = row["Descripcion"].ToString(),

                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)
            };

            return p;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var p = BuildObject(row);
                lstResults.Add(p);
            }
            return lstResults;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerPago"
            };
            oper.AddIntegerParam("IdPago", ID);

            return oper;
        }
    }
}
