using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;
using DTO;

namespace DataAccess.MAPPER
{
    public class PremiumMapper : IObjectMapper
    {
        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {

            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ActualizarMontoPremium"
            };
            var p = (Subscripcion)entyDTO;
            oper.AddVarcharParam("Nombre", p.Nombre);
            oper.AddVarcharParam("Descripcion", p.Descripcion);
            oper.AddDecimalParam("PrecioMensual", p.PrecioMensual);
            oper.AddIntegerParam("Estado", p.Estado);
   
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerMontoPremium"
            };
            oper.AddIntegerParam("Id", ID);

            return oper;
        }


        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            
            var PrecioMensual = new Subscripcion()
            {

                Nombre = Convert.ToString(row["Nombre"]),
                Descripcion = Convert.ToString(row["Descripcion"]),
                PrecioMensual = Convert.ToDecimal(row["PrecioMensual"]),
                Estado = Convert.ToInt32(row["Estado"]),
               
            };
            return PrecioMensual;
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
