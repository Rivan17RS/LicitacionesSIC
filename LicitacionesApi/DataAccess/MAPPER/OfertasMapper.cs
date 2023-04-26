using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class OfertasMapper : ICrudStatements, IObjectMapper
    {
        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            /* 
             var oper = new SqlOperation()
            {
                ProcedureName = "SP_CrearOferta"
            };
            var o = (Ofertas) entyDTO;
            oper.AddIntegerParam("IdLicitacion", o.IdLicitacion);
            oper.AddIntegerParam("IdUsuario", o.IdUsuario);
            oper.AddDateTimeParam("FechaEntrega", o.FechaEntrega);
            oper.AddDecimalParam("MontoTotal", o.MontoTotal);
            */
            throw new NotImplementedException();

        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}
