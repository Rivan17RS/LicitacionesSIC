using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class DetalleOfertasMapper : ICrudStatements, IObjectMapper
    {
        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_CrearDetalleOfertas"
            };
            var d = (DetalleOfertas) entyDTO;
            oper.AddIntegerParam("IdOferta", d.IdOferta);
            oper.AddIntegerParam("IdProducto", d.IdProducto);
            oper.AddIntegerParam("Cantidad", d.Cantidad);
            oper.AddIntegerParam("IdUsrCreacion", d.IdUsrCreacion);
            return oper;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_EliminarDetalleOferta"
            };
            var d = (Producto)entyDTO;
            oper.AddIntegerParam("Id", d.Id);

            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerDetalleOfertas"
            };

            return oper;
        }

        public SqlOperation GetRetrieveAllStatement(DetalleOfertas d)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerDetalleOfertasFiltro"
            };
            oper.AddIntegerParam("IdOferta", d?.IdOferta ?? 0);
            oper.AddIntegerParam("IdProducto", d?.IdProducto ?? 0);
            oper.AddIntegerParam("Cantidad", d?.Cantidad ?? 0);

            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int IdOferta)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerDetalleOfertasPorOferta"
            };
            oper.AddIntegerParam("IdOferta", IdOferta);

            return oper;
        }


        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation();
            oper.ProcedureName = "SP_ActualizarDetalleOfertas";

            var d = (DetalleOfertas)entyDTO;
            oper.AddIntegerParam("IdOferta", d.IdOferta);
            oper.AddIntegerParam("IdProducto", d.IdProducto);
            oper.AddIntegerParam("Cantidad", d.Cantidad);

            return oper;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var DeOfr = new DetalleOfertas()
            {
                Id = Convert.ToInt32(row["Id"]),
                IdOferta = Convert.ToInt32(row["IdOferta"]),
                IdProducto = Convert.ToInt32(row["IdProducto"]),
                Cantidad = Convert.ToInt32(row["Cantidad"]),

                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)

            };
            return DeOfr;
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
