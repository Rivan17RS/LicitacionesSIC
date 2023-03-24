using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DataAccess.CRUD;



namespace AppLogic
{
    public class UsuarioManager
    {
        public string AnadirCuenta(Usuario usr)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            var v = new Validaciones();

            if (!v.ValidTexto(usr.Nombre))
            {
                return "El formato del nombre es incorrecto";
            }

            if (!v.ValidTexto(usr.Apellidos))
            {
                return "El formato del apellido es incorrecto";
            }

            if (!v.ValidarIdentificacion(usr.Identificacion))
            {
                return "El formato de la identificación es incorrecto";
            }

            if (!v.ValidarTelefono(usr.Telefono))
            {
                return "El formato del teléfono es incorrecto";
            }

            if (!v.ValidCorreo(usr.CorreoElectronico))
            {
                return "El formato del correo electrónico es incorrecto";
            }

            if (!v.ValidContrasena(usr.Contrasena))
            {
                return "El formato de la contraseña es incorrecto";
            }

            var u = new Usuario
            {
                Nombre = usr.Nombre,
                Apellidos = usr.Apellidos,
                Identificacion = usr.Identificacion,
                Telefono = usr.Telefono,
                CorreoElectronico = usr.CorreoElectronico,
                Contrasena = Hashing.hashPassword(usr.Contrasena),
                Estado = 0,
                Otp = v.GenerarCodigoAlfanumerico(),
                Rol = 3,
                IdUsrCreacion = 1
            };

            ucf.Create(u);

            return "Realizado correctamente";
        }


        public Usuario ObtenerUsuario(string id)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            return ucf.RetrieveByIdent<Usuario>(id);
        }


        public string ValidarOTP(string id, string otp)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            Usuario usuario = ucf.RetrieveByIdent<Usuario>(id);

            if (usuario.Otp == otp)
            {
                usuario.Estado = 1;
                UsuarioCrudFactory ucf2 = new UsuarioCrudFactory();
                ucf2.Update(usuario);
                return "Usuario Validado Correctamente";
            }
            else
            {
                usuario.IntentosFallidos++;

                if (usuario.IntentosFallidos >= 3)
                {
                    UsuarioCrudFactory ucf2 = new UsuarioCrudFactory();
                    ucf2.Delete(usuario);
                    return "Usuario eliminado debido a tres intentos fallidos de validación.";
                }
                else
                {
                    UsuarioCrudFactory ucf2 = new UsuarioCrudFactory();
                    ucf2.Update(usuario);
                    return "OTP incorrecto";
                }
            }
        }

        public string ActualizarUsuario(Usuario usr)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            Usuario usuario = ucf.RetrieveByIdent<Usuario>(usr.Identificacion);

            if (usuario != null)
            {


                var v = new Validaciones();


                if (!v.ValidTexto(usr.Nombre))
                {
                    return "El formato del nombre es incorrecto";
                }

                if (!v.ValidTexto(usr.Apellidos))
                {
                    return "El formato del apellido es incorrecto";
                }

                if (!v.ValidarIdentificacion(usr.Identificacion))
                {
                    return "El formato de la identificación es incorrecto";
                }

                if (!v.ValidarTelefono(usr.Telefono))
                {
                    return "El formato del teléfono es incorrecto";
                }

                if (!v.ValidCorreo(usr.CorreoElectronico))
                {
                    return "El formato del correo electrónico es incorrecto";
                }

                if (!v.ValidContrasena(usr.Contrasena))
                {
                    return "El formato de la contraseña es incorrecto";
                }

                usuario.Nombre = usr.Nombre;
                usuario.Apellidos = usr.Apellidos;
                usuario.Identificacion = usr.Identificacion;
                usuario.Telefono = usr.Telefono;
                usuario.CorreoElectronico = usr.CorreoElectronico;
                usuario.Contrasena = Hashing.hashPassword(usr.Contrasena);
                usuario.IdUsrActualizacion = usr.IdUsrActualizacion;
                usuario.FechaActualizacion = DateTime.Now;

                ucf.Update(usuario);
                return "Actualizado Correctamente";
            }
            else
            {
                return "El usuario no existe";
            }
        }

        public string EliminarUsuario(String identificacion)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            Usuario usr = ucf.RetrieveByIdent<Usuario>(identificacion);
            if (usr == null)
            {
                return "El usuario no Existe";
            }
            ucf.Delete(usr);
            return "Usuario Eliminado";
        }

        public string CambiarRol(string identificacion, int rol)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            Usuario usr = ucf.RetrieveByIdent<Usuario>(identificacion);
            if (usr == null)
            {
                return "El usuario no Existe";
            }
            usr.Rol = rol;
            usr.IdUsrActualizacion = 1;
            usr.FechaActualizacion = DateTime.Now;
            ucf.Update(usr);
            return "Usuario Actualizado";

        }

        public string EstadoUsuario(string identificacion)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            Usuario usr = ucf.RetrieveByIdent<Usuario>(identificacion);
            if (usr == null)
            {
                return "El usuario no Existe";
            }
            if (usr.Estado == 1)
            {
                usr.Estado = 0;
            }
            else
            {
                usr.Estado = 1;
            }
            
            usr.IdUsrEliminacion = 1;
            usr.FechaEliminacion = DateTime.Now;
            ucf.Update(usr);
            return "Usuario Actualizado";

        }

        public List<Usuario> ObtenerUsuarios()
        {
            UsuarioCrudFactory usr = new UsuarioCrudFactory();
            return usr.RetrieveAll<Usuario>();
        }

        public Usuario buscarUsuarioPorCorreo(string correo)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            List<Usuario> listUsuarios = ObtenerUsuarios();

            foreach (Usuario usuario in listUsuarios)
            {
                if (usuario.CorreoElectronico == correo)
                {
                    return usuario;
                }
            }
            return null;
        }

        public Boolean VerificarSesion(String correo, String contrasena)
        {
            Usuario usuario = buscarUsuarioPorCorreo(correo);
            return Hashing.verifyPassword(contrasena, usuario.Contrasena);
        }
    }
}
