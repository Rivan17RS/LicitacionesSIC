using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class LicitacionMapper : ICrudStatements, IObjectMapper
    {


        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_CrearLicitacion";

            var l = (Licitaciones) entyDTO;
            oper.AddIntegerParam("IdAnalista", l.IdAnalista);
            oper.AddVarcharParam("Titulo", l.Titulo);
            oper.AddVarcharParam("Descripcion", l.Descripcion);
            oper.AddVarcharParam("LugarEntrega", l.LugarEntrega);
            oper.AddDateTimeParam("FechaCierreOfertas", l.FechaCierreOfertas);
            oper.AddDoubleParam("MontoPresupuestado", l.MontoPresupuestado);
            oper.AddIntegerParam("IdUsrCreacion", l.IdUsrCreacion);
            oper.AddDateTimeParam("FechaCreacion", DateTime.Now);

            return oper;

        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_EliminarLicitacion"
            };
            var l = (Licitaciones)entyDTO;
            oper.AddIntegerParam("IdLicitacion", l.Id);
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerLicitaciones"
            };
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            throw new NotImplementedException();
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            throw new NotImplementedException();
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
