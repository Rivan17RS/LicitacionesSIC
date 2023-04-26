using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DetalleOfertas:BaseEntity
    {
        public int IdOferta { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
    }
}
