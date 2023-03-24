using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using AppLogic;
using System.Security.Cryptography.X509Certificates;

namespace WebApp.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpPost]
        public string CrearUsuario(string nombre, string apellidos, string identificacion, string telefono, string correo, string contrasena)
        {
            var usr = new UsuarioManager();

            var u = new Usuario
            {
                Nombre = nombre,
                Apellidos = apellidos,
                Identificacion = identificacion,
                Telefono = telefono,
                CorreoElectronico = correo,
                Contrasena = contrasena
                
            };

            return usr.AnadirCuenta(u);
        }

        [HttpGet]
        public Usuario ObtenerUsuario(string id)
        {
            var usr = new UsuarioManager();
            return usr.ObtenerUsuario(id);
        }

        [HttpPost]

        public String ValidarOtp(string identificacion, string otp)
        {
            var usr = new UsuarioManager();

            return usr.ValidarOTP(identificacion, otp);
        }

        public String ActualizarUsuario(string nombre, string apellidos, string identificacion, string telefono, string correo, string contrasena)
        {
            var usr = new UsuarioManager();

            var u = new Usuario
            {
                Nombre = nombre,
                Apellidos = apellidos,
                Identificacion = identificacion,
                Telefono = telefono,
                CorreoElectronico = correo,
                Contrasena = contrasena

            };

            return usr.ActualizarUsuario(u);
        }
        [HttpPost]
        public string EliminarUuario(string identificacion)
        {
            var usr = new UsuarioManager();
            return usr.EliminarUsuario(identificacion);
        }
        [HttpPost]
        public string CambiarRol(string Identificacion, int rol)
        {
            var usr = new UsuarioManager();
            return usr.CambiarRol(Identificacion,rol);
        }
        [HttpPost]
        public string EstadoUsuario(string Identificacion)
        {
            var usr = new UsuarioManager();
            return usr.EstadoUsuario(Identificacion);
        }

        [HttpGet]

        public List<Usuario> ObtenerUsuarios()
        {
            var usr = new UsuarioManager();
            return usr.ObtenerUsuarios();
        }

        public bool ValidarUsuario(string correo, string contrasena)
        {
            var usr = new UsuarioManager();
            return usr.VerificarSesion(correo, contrasena);
        }
    }
}
