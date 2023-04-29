using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Adjudicaciones:BaseEntity
    {
        public int IdOferta { get; set; }
        public int IdUsuario { get; set; }
        public DateTime FechaAdjudicacion { get; set; }
    }
}
