using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DetalleLicitaciones:BaseEntity
    {
        public int IdLicitacion { get; set; }
        public int Idproducto { get; set; }
        public int Cantidad { get; set; }

    }
}
