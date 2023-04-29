using DataAccess.DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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

        public SqlOperation GetRetrieveAllStatement(Licitaciones l)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerLicitacionesFiltro"
            };
            oper.AddIntegerParam("Id", l?.Id ?? 0);
            oper.AddIntegerParam("IdAnalista", l?.IdAnalista ?? 0);
            oper.AddVarcharParam("Titulo", l?.Titulo == "" ? null : l?.Titulo);
            oper.AddVarcharParam("LugarEntrega", l?.LugarEntrega == "" ? null : l?.LugarEntrega);
            DateTime fechaCierre = l.FechaCierreOfertas == new DateTime(1, 1, 1, 0, 0, 0) ? new DateTime(1753, 1, 1, 0, 0, 0) : l.FechaCierreOfertas;
            oper.AddDateTimeParam("FechaCierreOfertas", fechaCierre);
            oper.AddDoubleParam("MontoPresupuestado", l?.MontoPresupuestado ?? 0);
            oper.AddVarcharParam("Estado", l?.Estado == "" ? null : l?.Estado);
           

            return oper;

        }

        public SqlOperation GetRetrieveByIDStatement(int ID)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ObtenerLicitacion"
            };
            oper.AddIntegerParam("Id", ID); 
            return oper;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entyDTO)
        {
            var oper = new SqlOperation()
            {
                ProcedureName = "SP_ActualizarLicitacion"
            };
            var l = (Licitaciones)entyDTO;
            oper.AddIntegerParam("Id", l.Id);
            oper.AddVarcharParam("Titulo", l.Titulo);
            oper.AddVarcharParam("Descripcion", l.Descripcion);
            oper.AddVarcharParam("LugarEntrega", l.LugarEntrega);
            oper.AddDateTimeParam("FechaCierreOfertas", l.FechaCierreOfertas);
            oper.AddDoubleParam("MontoPresupuestado", l.MontoPresupuestado);
            oper.AddVarcharParam("Estado", l.Estado);
            oper.AddIntegerParam("IdUsrActualizacion", l.IdUsrActualizacion);
         

            return oper;
        }

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            DetalleLicitacionesMapper dl = new DetalleLicitacionesMapper();
            var licitacion = new Licitaciones()
            {
                Id = Convert.ToInt32(row["Id"]),
                IdAnalista = Convert.ToInt32(row["IdAnalista"]),
                Titulo = Convert.ToString(row["Titulo"]),
                Descripcion = Convert.ToString(row["Descripcion"]),
                LugarEntrega = Convert.ToString(row["LugarEntrega"]),
                FechaCierreOfertas = Convert.ToDateTime(row["FechaCierreOfertas"]),
                MontoPresupuestado = Convert.ToDouble(row["MontoPresupuestado"]),
                Estado = Convert.ToString(row["Estado"]),
                CodigoQR = Convert.ToString(row["CodigoQR"]),


                //necesario para todas las tablas
                IdUsrCreacion = row["IdUsrCreacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrCreacion"]) : 0,
                IdUsrActualizacion = row["IdUsrActualizacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrActualizacion"]) : 0,
                IdUsrEliminacion = row["IdUsrEliminacion"] != DBNull.Value ? Convert.ToInt32(row["IdUsrEliminacion"]) : 0,
                FechaCreacion = Convert.ToDateTime(row["FechaCreacion"]),
                FechaActualizacion = row["FechaActualizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaActualizacion"]) : new DateTime(1753, 1, 1, 0, 0, 0),
                FechaEliminacion = row["FechaEliminacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaEliminacion"]) : new DateTime(1753, 1, 1, 0, 0, 0)
            };
            return licitacion;
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
