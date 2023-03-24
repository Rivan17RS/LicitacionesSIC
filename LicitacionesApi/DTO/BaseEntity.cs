using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BaseEntity
    {
        public int Id { get; set; }

        public int IdUsrCreacion { get; set; }
        public int IdUsrActualizacion { get; set; }
        public int IdUsrEliminacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public DateTime FechaEliminacion { get; set; }
    }
}
