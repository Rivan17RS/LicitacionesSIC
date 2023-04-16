using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public class DetalleLicitacionesMapper : ICrudStatements, IObjectMapper
    {


        public SqlOperation GetCreateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_CrearDetalleLicitacion" 
            };
            var d = (DetalleLicitaciones) entyDTO;
            oper.AddIntegerParam("IdLicitacion", d.IdLicitacion);
            oper.AddIntegerParam("IdProducto", d.Idproducto);
            oper.AddIntegerParam("Cantidad", d.Cantidad);
            oper.AddIntegerParam("IdUsrCreacion", d.IdUsrCreacion);

            return oper;

        }

        public SqlOperation GetDeleteStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_EliminarDetalleLicitacion"
            };
            var d = (DetalleLicitaciones)entyDTO;
            oper.AddIntegerParam("IdDetalleLicitacion", d.Id);
            return oper;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerDetallesLicitaciones"
            };
            return oper;
        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerDetalleLicitacion"
            };
            oper.AddIntegerParam("IdDetalleLicitacion", ID);
            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ActualizarDetalleLicitacion"
            };
            var d = (DetalleLicitaciones)entyDTO;
            oper.AddIntegerParam("IdLicitacion", d.IdLicitacion);
            oper.AddIntegerParam("IdProducto", d.Idproducto);
            oper.AddIntegerParam("Cantidad", d.Cantidad);
            oper.AddIntegerParam("IdUsrActualizacion", d.IdUsrActualizacion);

            return oper;
        }

        public SqlOperation GetRetrieveByIDLicStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerDetallesLicitacionId"
            };
            oper.AddIntegerParam("IdLicitacion", ID);
            return oper;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var detalle = new DetalleLicitaciones()
            {
                Id = Convert.ToInt32(row["Id"]),
                IdLicitacion = Convert.ToInt32(row["IdLicitacion"]),
                Idproducto = Convert.ToInt32(row["IdProducto"]),
                Cantidad = Convert.ToInt32(row["Cantidad"]),

                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)
            };

            return detalle;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var dl = BuildObject(row);
                lstResults.Add(dl);
            }
            return lstResults;
        }
    }
}
