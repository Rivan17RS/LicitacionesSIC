using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.CRUD;
using DTO;

namespace AppLogic
{
    public class PremiumManager
    {
        PremiumCrudFactory pcf = new PremiumCrudFactory();
        Validaciones v = new Validaciones();
        public Subscripcion ObtenerPrecioMensual(int id)
        {
            PremiumCrudFactory pcf = new PremiumCrudFactory();
            return pcf.RetrieveByID<Subscripcion>(id);
        }

        public Response ActualizarMontoPremium(Subscripcion p)
        {
            Subscripcion prem = pcf.RetrieveByID<Subscripcion>(p.Id);
 
            if (!v.ValidarNumero(Convert.ToDouble(p.PrecioMensual)))
            {
                return new Response("Error de entrada", "El valor debe ser mayor a 0", ResponseType.ERROR);
            }
    
            prem.Nombre = p.Nombre;
            prem.Descripcion = p.Descripcion;
            prem.PrecioMensual = p.PrecioMensual;
            prem.Estado = p.Estado;

            try
            {
                pcf.Update(prem);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", "No se pudo actualizar", ResponseType.ERROR);
                }
            }
            return new Response("Success", "Membresía Actualizada exitosamente", ResponseType.SUCCESS);
        }


    }
}
