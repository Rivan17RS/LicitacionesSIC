using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Licitaciones:BaseEntity
    {
        public int IdAnalista { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string LugarEntrega { get; set; }
        public DateTime FechaCierreOfertas { get; set; }
        public double MontoPresupuestado { get; set; }
        public string Estado { get; set; }
        public string CodigoQR { get; set; }


    }
}
