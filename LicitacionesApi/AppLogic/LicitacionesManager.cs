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
                return "El monto presupuestado debe ser mallor que 0";
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
    }
}
