using DataAccess.CRUD;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class LicitacionesManager
    {
        public string CrearLicitacion(Licitaciones lic)
        {
            LicitacionCrudFactory lcf = new LicitacionCrudFactory();
            var v = new Validaciones();

            if (!v.ValidarNumero(lic.MontoPresupuestado))
            {
                return "El monto presupuestado debe ser mayor a 0";
            }


            var l = new Licitaciones
            {
                IdAnalista = lic.IdAnalista,
                Titulo = lic.Titulo,
                Descripcion = lic.Descripcion,
                LugarEntrega= lic.LugarEntrega,
                FechaCierreOfertas = lic.FechaCierreOfertas,
                MontoPresupuestado = lic.MontoPresupuestado,
                IdUsrCreacion = lic.IdUsrCreacion
            };

            lcf.Create(l);
            return "Realizado correctamente";
        }

        public Licitaciones ObtenerLicitacion(int Id)
        {
            LicitacionCrudFactory lcf =new LicitacionCrudFactory();
            return lcf.RetrieveByID<Licitaciones>(Id);
        }

        public string ActualizarLicitacion(Licitaciones lic)
        {
            LicitacionCrudFactory lcf = new LicitacionCrudFactory();
            var v = new Validaciones();
            Licitaciones licitacion = lcf.RetrieveByID<Licitaciones>(lic.Id);
            if(licitacion != null ) { 
                if (!v.ValidarNumero(lic.MontoPresupuestado))
                {
                    return "El monto presupuestado debe ser mayor a 0";
                }
                var l = new Licitaciones
                {
                    Id = lic.Id,
                    Titulo = lic.Titulo,
                    Descripcion = lic.Descripcion,
                    LugarEntrega = lic.LugarEntrega,
                    FechaCierreOfertas = lic.FechaCierreOfertas,
                    MontoPresupuestado = lic.MontoPresupuestado,
                    Estado = lic.Estado,
                    IdUsrActualizacion = lic.IdUsrActualizacion
                };
                lcf.Update(l);
                return "Actualizado Correctamente";
            }
            else
            {
                return "La Licitación no existe";
            }
            

        }

        public string EliminarLicitacion(int Id)
        {
            LicitacionCrudFactory lcf = new LicitacionCrudFactory();
            Licitaciones licitacion = lcf.RetrieveByID<Licitaciones>(Id);

            if (licitacion == null)
            {
                return "La Licitación no existe";
            }
            lcf.Delete(licitacion);
            return "Licitación Eliminada";
        }

        public List<Licitaciones> ObtenerLicitaciones()
        {
            LicitacionCrudFactory lcf = new LicitacionCrudFactory();
            return lcf.RetrieveAll<Licitaciones>();
        }

        public List<Licitaciones> ObtenerLicitaciones(Licitaciones l)
        {
            LicitacionCrudFactory lcf = new LicitacionCrudFactory();
            return lcf.RetrieveAll<Licitaciones>(l);
        }
    }
}
