using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PagosUsuarios:BaseEntity
    {
        public int IdUsuario { get; set; }
        public decimal Monto { get; set; }
        public int Estado { get; set; }
        public string Descripcion { get; set; }
    }
}
