using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;
using DTO;

namespace DataAccess.MAPPER
{
    public class ProductoMapper : ICrudStatements, IObjectMapper
    {

        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP"
            };
            var p = (Producto) entyDTO;
            oper.AddVarcharParam("Nombre", p.Nombre);
            oper.AddVarcharParam("Descripcion", p.Descripcion);
            oper.AddDecimalParam("Precio", p.Precio);
            oper.AddIntegerParam("StockCantidad", p.StockCantidad);
            oper.AddIntegerParam("IdAdmin", p.IdAdmin);

            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP"
            };
            var p = (Producto) entyDTO;
            oper.AddIntegerParam("Id", p.Id);

            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP"
            };
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP"
            };
            oper.AddIntegerParam("Id", ID);

            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP"
            };
            var p = (Producto)entyDTO;
            oper.AddVarcharParam("Nombre", p.Nombre);
            oper.AddVarcharParam("Descripcion", p.Descripcion);
            oper.AddDecimalParam("Precio", p.Precio);
            oper.AddIntegerParam("StockCantidad", p.StockCantidad);
            oper.AddIntegerParam("IdUsrActualizacion", p.IdUsrActualizacion);
           

            return oper;
        }
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var p = new Producto()
            {
                Id = Convert.ToInt32(row["Id"]),
                Nombre = (row["Nombre"]).ToString(),
                Descripcion = (row["Descripcion"].ToString()),
                Precio = Convert.ToDecimal(row["Precio"]),
                StockCantidad = Convert.ToInt32("StockCantidad"),
                IdAdmin = Convert.ToInt32(row["IdAdmin"]),
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
    }
}
