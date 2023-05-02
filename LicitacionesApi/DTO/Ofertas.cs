using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Ofertas:BaseEntity
    {
        public int IdOferta { get; set; }
        public int IdLicitacion { get; set; }
        public int IdUsuario { get; set; }
        public DateTime FechaEntrega { get; set; }
        public decimal MontoTotal { get; set; }
    }
}
