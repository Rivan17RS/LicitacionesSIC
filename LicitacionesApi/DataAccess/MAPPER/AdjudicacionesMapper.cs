using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class AdjudicacionesMapper : ICrudStatements, IObjectMapper
    {
        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_CrearAdjudicacion";

            var adjudicacion = (Adjudicaciones)entyDTO;
            oper.AddIntegerParam("IdOferta", adjudicacion.IdOferta);
            oper.AddIntegerParam("IdUsuario", adjudicacion.IdUsuario);
            oper.AddDateTimeParam("FechaAdjudicacion", adjudicacion.FechaAdjudicacion);
            oper.AddIntegerParam("IdUsrCreacion", adjudicacion.IdUsrCreacion);

            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_EliminarAdjudicacion";

            var adjudicacion = (Adjudicaciones)entyDTO;
            oper.AddIntegerParam("Id", adjudicacion.Id);
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerAdjudicaciones"
            };
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerAdjudicacionPorId"
            };
            oper.AddIntegerParam("Id", ID);

            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ActualizarAdjudicacion";

            var adjudicacion = (Adjudicaciones)entyDTO;
            oper.AddIntegerParam("Id", adjudicacion.Id);
            oper.AddIntegerParam("IdOferta", adjudicacion.IdOferta);
            oper.AddIntegerParam("IdUsuario", adjudicacion.IdUsuario);
            oper.AddDateTimeParam("FechaAdjudicacion", adjudicacion.FechaAdjudicacion);
            oper.AddIntegerParam("IdUsrActualizacion", adjudicacion.IdUsrActualizacion);
            oper.AddDateTimeParam("FechaActualizacion", DateTime.Now);

            return oper;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var adjudicacion = new Adjudicaciones()
            {
                Id = Convert.ToInt32(row["Id"]),
                IdOferta = Convert.ToInt32(row["IdOferta"]),
                IdUsuario = Convert.ToInt32(row["IdUsuario"]),
                FechaAdjudicacion = Convert.ToDateTime(row["FechaAdjudicacion"]),

                // Necessary for all tables
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : default(DateTime),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : default(DateTime)
            };

            return adjudicacion;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var adjudicacion = BuildObject(row);
                lstResults.Add(adjudicacion);
            }

            return lstResults;
        }


    }
}
