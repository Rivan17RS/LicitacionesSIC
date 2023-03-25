using DataAccess.CRUD;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class DetalleLicitacionesManager
    {
        public string CrearDetalleLicitacion(DetalleLicitaciones detalle)
        {
            DetalleLicitacionesCrudFactory dcf = new DetalleLicitacionesCrudFactory();
            var v = new Validaciones();

            if (!v.ValidarNumero(detalle.Cantidad))
            {
                return "La cantidad debe ser mayor a 0";
            }

            var d = new DetalleLicitaciones()
            {
                IdLicitacion = detalle.IdLicitacion,
                Idproducto = detalle.Idproducto,
                Cantidad = detalle.Cantidad,
                IdUsrCreacion = detalle.IdUsrCreacion
            };

            dcf.Create(d);
            return "Realizado Correctamente";
        }

        public DetalleLicitaciones ObtenerDetalleLicitacion( int Id)
        {
            DetalleLicitacionesCrudFactory dcf = new DetalleLicitacionesCrudFactory();
            return dcf.RetrieveByID<DetalleLicitaciones>(Id);
        }

        public string ActualizarDetalleLicitacion(DetalleLicitaciones detalle)
        {
            DetalleLicitacionesCrudFactory dcf = new DetalleLicitacionesCrudFactory();
            var v = new Validaciones();
            DetalleLicitaciones dl = dcf.RetrieveByID<DetalleLicitaciones>(detalle.Id);
            if (dl != null)
            {
                if (!v.ValidarNumero(detalle.Cantidad))
                {
                    return "La cantidad debe ser mayor a 0";
                }

                var d = new DetalleLicitaciones()
                {
                    IdLicitacion = detalle.IdLicitacion,
                    Idproducto = detalle.Idproducto,
                    Cantidad = detalle.Cantidad,
                    IdUsrActualizacion = detalle.IdUsrActualizacion
                };

                dcf.Update(d);
                return "Actualizado Correctamente";
            }
            return "El detalle no existe";
        }

        public string EliminarDetalleLicitacion(int Id)
        {
            DetalleLicitacionesCrudFactory dcf = new DetalleLicitacionesCrudFactory();
            var v = new Validaciones();
            DetalleLicitaciones d = dcf.RetrieveByID<DetalleLicitaciones>(Id);
            if (d != null)
            {
                return "El detalle no existe";
            }
            dcf.Delete(d);
            return "Detalle eliminado";

        }

        public List<DetalleLicitaciones> ObtenerDetalleLicitaciones()
        {
            DetalleLicitacionesCrudFactory dcf = new DetalleLicitacionesCrudFactory();
            return dcf.RetrieveAll<DetalleLicitaciones>();
        }

        public List<DetalleLicitaciones> ObtenerDetalleLicitacionesId(int Id)
        {
            DetalleLicitacionesCrudFactory dcf = new DetalleLicitacionesCrudFactory();
            return dcf.RetrieveByLicitacion<DetalleLicitaciones>(Id);
        }
    }
}
