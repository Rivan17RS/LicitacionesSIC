using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class OfertasMapper : ICrudStatements, IObjectMapper
    {
        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            
             var oper = new SqlOperation()
            {
                ProcedureName = "SP_CrearOfertas"
            };
            var o = (Ofertas) entyDTO;
            oper.AddIntegerParam("IdLicitacion", o.IdLicitacion);
            oper.AddIntegerParam("IdUsuario", o.IdUsuario);
            oper.AddDateTimeParam("FechaEntrega", o.FechaEntrega);
            oper.AddDecimalParam("MontoTotal", o.MontoTotal);
            oper.AddIntegerParam("IdUsrCreacion", o.IdUsuario);

            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_EliminarOfertas"
            };
            var o = (Ofertas) entyDTO;
            oper.AddIntegerParam("IdOferta", o.IdOferta);

            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerOfertas"
            };

            return oper;
        }
        public SqlOperation GetRetrieveAllStatementByLic(int IdLic)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerOfertasLicitacion"
            };
            oper.AddIntegerParam("IdLicitacion", IdLic);
            return oper;
        }
        public SqlOperation GetRetrieveAllStatement(Ofertas o)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerOfertasFiltro"
            };
            oper.AddIntegerParam("IdOferta", o?.IdOferta ?? 0);
            oper.AddIntegerParam("IdLicitacion", o?.IdLicitacion ?? 0);
            oper.AddIntegerParam("IdUsuario", o?.IdUsuario ?? 0);
            DateTime FechaEntrega = o.FechaEntrega == new DateTime(1, 1, 1, 0, 0, 0) ? new DateTime(1753, 1, 1, 0, 0, 0) : o.FechaEntrega;
            oper.AddDecimalParam("MontoTotal", o?.MontoTotal ?? 0);

            return oper;
            
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerOfertasPorId"
            };
            oper.AddIntegerParam("Id", ID);
            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ActualizarOferta"
            };
            var o = (Ofertas) entyDTO;
            oper.AddIntegerParam("Id", o.Id);
            oper.AddIntegerParam("OfertaId", o.IdOferta);
            oper.AddIntegerParam("IdLicitacion", o.IdLicitacion);
            oper.AddIntegerParam("IdUsuario", o.IdUsuario);
            oper.AddDateTimeParam("FechaEntrega", o.FechaEntrega);
            oper.AddDecimalParam("MontoTotal", o.MontoTotal);

            return oper;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            Ofertas ofertas = new Ofertas();
            var oferta = new Ofertas()
            {
                Id = Convert.ToInt32(row["Id"]),
                IdLicitacion = Convert.ToInt32(row["IdLicitacion"]),
                IdUsuario = Convert.ToInt32(row["IdUsuario"]),
                FechaEntrega = Convert.ToDateTime(row["FechaEntrega"]),
                MontoTotal = Convert.ToDecimal(row["MontoTotal"]),

            //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)
            };
            return oferta;
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
