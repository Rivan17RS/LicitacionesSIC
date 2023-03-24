using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Usuario:BaseEntity
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Identificacion { get; set; }
        public string Telefono { get; set; }
        public string CorreoElectronico { get; set; }
        public string Contrasena { get; set; }
        public int Estado { get; set; }
        public int Rol { get; set; }
        public string Otp { get; set; }
        public int IntentosFallidos { get; set; }

    }
}
