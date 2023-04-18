using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class StockProductosMapper: ICrudStatements, IObjectMapper
    {
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_CrearStockProductos";

            var stock = (StockProductos) entity;
            oper.AddIntegerParam("IdUsuario", stock.IdUsuario);
            oper.AddIntegerParam("IdProducto", stock.IdProducto);
            oper.AddIntegerParam("Cantidad", stock.Cantidad);
            oper.AddDecimalParam("PrecioUnidad", stock.PrecioUnidad);
            oper.AddIntegerParam("IdUsrCreacion", stock.IdUsuario);
            oper.AddDateTimeParam("FechaCreacion", DateTime.Now);

            return oper;
        }


        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_EliminarStockProductos";

            var u = (StockProductos) entyDTO;
            oper.AddIntegerParam("IdUsuario", u.IdUsuario);
            oper.AddIntegerParam("IdProducto", u.IdProducto);
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerStockProductos"
            };
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int IdUsuario, int IdProducto)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ObtenerStockProductos_ID";

            oper.AddIntegerParam("IdUsuario", IdUsuario);
            oper.AddIntegerParam("IdProducto", IdProducto);
            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ActualizarProductoUsuario";

            var u = (StockProductos) entyDTO;
            oper.AddIntegerParam("IdUsuario", u.IdUsuario);
            oper.AddIntegerParam("IdProducto", u.IdProducto);
            oper.AddIntegerParam("Cantidad", u.Cantidad);
            oper.AddDecimalParam("PrecioUnidad", u.PrecioUnidad);

            return oper;

        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var usuario = new StockProductos()
            {
                IdUsuario = Convert.ToInt32(row["IdUsuario"]),
                IdProducto = Convert.ToInt32(row["IdProducto"]),
                Cantidad = Convert.ToInt32(row["Cantidad"]),
                PrecioUnidad = Convert.ToDecimal(row["PrecioUnidad"]),

                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)
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
            throw new NotImplementedException();
        }
    }
}
