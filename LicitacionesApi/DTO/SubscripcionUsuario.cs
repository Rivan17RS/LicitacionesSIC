using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SubscripcionUsuario:BaseEntity
    {
        public int IdUsuario { get; set; }
        public int IdSubscripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinal { get; set; }
        public int Estado { get; set; }


    }
}
