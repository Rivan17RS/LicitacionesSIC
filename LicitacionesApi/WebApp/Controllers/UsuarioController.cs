using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using AppLogic;
using System.Security.Cryptography.X509Certificates;
using Newtonsoft.Json;

namespace WebApp.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpPost]
        public Response CrearUsuario(string nombre, string apellidos, string identificacion, string telefono, string correo, string contrasena)
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

        [HttpGet]
        public Usuario ObtenerUsuarioID(int ID)
        {
            var usr = new UsuarioManager();
            return usr.ObtenerUsuario(ID);
        }

        [HttpPost]

        public Response ValidarOtp(string identificacion, string otp)
        {
            var usr = new UsuarioManager();

            return usr.ValidarOTP(identificacion, otp);
        }

        public String ActualizarUsuario(string Otp, string nombre, string apellidos, string identificacion, string telefono, string correo, string contrasena)
        {
            var usr = new UsuarioManager();

            var u = new Usuario
            {
                Nombre = nombre,
                Apellidos = apellidos,
                Identificacion = identificacion,
                Telefono = telefono,
                CorreoElectronico = correo,
                Contrasena = contrasena,
                Otp = Otp

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


        [HttpPost]

        public List<Usuario> ObtenerUsuariosFiltro(Usuario usr)
        {
            var um = new UsuarioManager();
            return um.ObtenerUsuarios(usr);
        }

        public bool ValidarUsuario(string correo, string contrasena)
        {
            var usr = new UsuarioManager();
            return usr.VerificarSesion(correo, contrasena);
        }

        [HttpGet]

        public Usuario ValidareIniciarSesion(string correo, string contrasena)
        {
            if (ValidarUsuario(correo, contrasena))
            {
                UsuarioManager usuarioManager = new UsuarioManager();

                Usuario usuario = usuarioManager.BuscarUsuarioPorCorreo(correo);

                if (usuario != null)
                {
                    return usuario;
                }

                else
                {
                    return null;
                }
            }

            return null;
        }

        [HttpPost]
        public string EnviarCorreoRecuperacion(string correo)
        {
            var usr = new UsuarioManager();

            var usuario = usr.BuscarUsuarioPorCorreo(correo);

            if (usuario == null)
            {
                return "No se encontró el usuario";
            }

            var validaciones = new Validaciones();

            var otp = validaciones.GenerarCodigoAlfanumerico();

            usuario.Otp = otp;

            usr.ActualizarUsuario(usuario);

            var URL = $"https://licitacionesUI.azurewebsites.net/IniciarSesion/CrearContrasenaNueva?correo={correo}&codigo={otp}";

            usr.SendRecoveryEmail(correo, URL);

            return "Se envió de manera exitosa";
        }

        [HttpGet]
        public bool ValidarCodigoRecuperacion(string correo, string codigo)
        {
            var usr = new UsuarioManager();

            var usuario = usr.BuscarUsuarioPorCorreo(correo);

            if (usuario == null)
            {
                return false;
            }

            if (usuario.Otp == codigo)
            {
                return true;
            }

            return false;
        }

        [HttpPost]
        public string CambiarContrasena(string correo, string contrasenaNueva)
        {
            var usr = new UsuarioManager();

            var usuario = usr.BuscarUsuarioPorCorreo(correo);

            if (usuario == null)
            {
                return "No se encontró el usuario";
            }

            usuario.Contrasena = Hashing.CreateHash(contrasenaNueva);

            usuario.Otp = (new Validaciones()).GenerarCodigoAlfanumerico(); // Se elimina el código de recuperación por seguridad.

            usr.ActualizarUsuario(usuario);

            return "Se actualizó la contraseña de manera exitosa";
        }
    }
}
