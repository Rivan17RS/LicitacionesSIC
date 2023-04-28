using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DataAccess.CRUD;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace AppLogic
{
    public class UsuarioManager
    {
        public Response AnadirCuenta(Usuario usr)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            var v = new Validaciones();

            if (!v.ValidTexto(usr.Nombre))
            {
                return new Response("Error de entrada", "El formato del nombre es incorrecto", ResponseType.ERROR);
            }

            if (!v.ValidTexto(usr.Apellidos))
            {
                return new Response("Error de entrada", "El formato del apellidos es incorrecto", ResponseType.ERROR);
            }

            if (!v.ValidarIdentificacion(usr.Identificacion))
            {
                return new Response("Error de entrada", "El formato del identificación es incorrecto", ResponseType.ERROR);
            }

            if (!v.ValidarTelefono(usr.Telefono))
            {
                return new Response("Error de entrada", "El formato del teléfono es incorrecto", ResponseType.ERROR);
            }

            if (!v.ValidCorreo(usr.CorreoElectronico))
            {
                return new Response("Error de entrada", "El formato del correo electrónico es incorrecto", ResponseType.ERROR);
            }

            if (!v.ValidContrasena(usr.Contrasena))
            {
                return new Response("Error de entrada", "El formato de la contrasena es incorrecto", ResponseType.ERROR);
            }

            var u = new Usuario
            {
                Nombre = usr.Nombre,
                Apellidos = usr.Apellidos,
                Identificacion = usr.Identificacion,
                Telefono = usr.Telefono,
                CorreoElectronico = usr.CorreoElectronico,
                Contrasena = Hashing.CreateHash(usr.Contrasena),
                Estado = 0,
                Otp = v.GenerarCodigoAlfanumerico(),
                Rol = 3,
                IdUsrCreacion = 1


            };

            try
            {
                ucf.Create(u);

            }

            catch (SqlException ex)
            {
                if (ex.Number == 2601)
                {
                    return new Response("Error en la entrada", $"El usuario de identificación {u.Identificacion} ya existe en nuestras bases de datos", ResponseType.ERROR);
                }
            }
            SendEmail(u.CorreoElectronico, u.Otp);
            return new Response("Success", "Usuario creado exitosamente", ResponseType.SUCCESS);
        }


        public Usuario ObtenerUsuario(string id)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            return ucf.RetrieveByIdent<Usuario>(id);
        }


        public Usuario ObtenerUsuario(int id)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            return ucf.RetrieveByID<Usuario>(id);
        }

        public Response ValidarOTP(string id, string otp)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();


            Usuario usuario = null;
            try
            {

                usuario = ucf.RetrieveByIdent<Usuario>(id);
            }

            catch
            {
                return new Response("Error en la base de datos", "Error en la base de datos", ResponseType.ERROR);
            }

            if (usuario == null)
            {
                return new Response("Error en la entrada", "Usuario no encontrado", ResponseType.ERROR);
            }

            if (usuario.Otp == otp)
            {
                usuario.Estado = 1;
                UsuarioCrudFactory ucf2 = new UsuarioCrudFactory();
                ucf2.Update(usuario);
                return new Response("Validación de usuario correcta", "", ResponseType.SUCCESS);
            }
            else
            {
                usuario.IntentosFallidos++;

                if (usuario.IntentosFallidos >= 3)
                {
                    UsuarioCrudFactory ucf2 = new UsuarioCrudFactory();
                    ucf2.Delete(usuario);
                    return new Response("Intentos fallidos", "Usuario eliminado debido a tres intentos fallidos de validación.", ResponseType.ERROR);
                }
                else
                {
                    UsuarioCrudFactory ucf2 = new UsuarioCrudFactory();
                    ucf2.Update(usuario);
                    return new Response("Entrada incorecta", "OTP incorrecto", ResponseType.ERROR);
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

                usuario.Nombre = usr.Nombre;
                usuario.Apellidos = usr.Apellidos;
                usuario.Identificacion = usr.Identificacion;
                usuario.Telefono = usr.Telefono;
                usuario.CorreoElectronico = usr.CorreoElectronico;
                usuario.Contrasena = usr.Contrasena;
                usuario.IdUsrActualizacion = usr.IdUsrActualizacion;
                usuario.FechaActualizacion = DateTime.Now;
                // es necesario tener la opción de actualizar el OTP. Se usa para poder crear el codigo de recuperación (un one-time URL para poder actualizar el usuario)
                usuario.Otp = usr.Otp;
   

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

        public List<Usuario> ObtenerUsuarios(Usuario usr)
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            return ucf.RetrieveAll<Usuario>(usr);
        }


        public List<Usuario> ObtenerUsuarios()
        {
            UsuarioCrudFactory ucf = new UsuarioCrudFactory();
            return ucf.RetrieveAll<Usuario>();
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

        public Usuario BuscarUsuarioPorCorreo(string correo)
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
            Usuario usuario = BuscarUsuarioPorCorreo(correo);
            if (usuario == null)
            {
                return false;
            }
            return Hashing.VerifyHash(contrasena, usuario.Contrasena);
        }

        public bool SendEmail(string Dest, string code)
        {
            var ed = new EmailDataManager();
            var e = new Email()
            {
                Dest = Dest,
                Subject = "Codigo de Seguridad",
                IsHtml = true,
                Body = @"
                        <!DOCTYPE html>
                        <html>
                        <head>
	                        <meta charset='UTF-8'>
	                        <title>Código de seguridad</title>
	                        <style>
		                        body {
			                        font-family: Arial, sans-serif;
			                        background-color: #f5f5f5;
			                        padding: 20px;
		                        }

		                        .container {
			                        background-color: #fff;
			                        border-radius: 10px;
			                        padding: 20px;
			                        max-width: 600px;
			                        margin: 0 auto;
		                        }

		                        h1 {
			                        color: #0056b3;
			                        font-size: 24px;
			                        margin-top: 0;
		                        }

		                        p {
			                        font-size: 16px;
			                        line-height: 1.5;
			                        margin: 0;
			                        padding-bottom: 20px;
		                        }

		                        .code {
			                        font-size: 28px;
			                        font-weight: bold;
			                        color: #0056b3;
			                        margin-bottom: 20px;
		                        }
	                        </style>
                        </head>
                        <body>
	                        <div class='container'>
		                        <h1>Código de seguridad</h1>
		                        <p>Este es su código de seguridad para realizar la acción solicitada:</p>
		                        <div class='code'>" + code + @"</div>
		                        <p>No comparta este código con nadie.</p>
	                        </div>
                        </body>
                        </html>
                        "
            };
            return ed.Send(e);
        }

        public bool SendRecoveryEmail(string dest, string URL)
        {
            EmailDataManager emailDataManager = new EmailDataManager();

            var email = new Email()
            {
                Dest = dest,
                Subject = "Recuperación de contraseña",
                IsHtml = true,
                Body = @"
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset='UTF-8'>
                            <title>Recuperación de contraseña</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f5f5f5;
                                    padding: 20px;
                                }

                                .container {
                                    background-color: #fff;
                                    border-radius: 10px;
                                    padding: 20px;
                                    max-width: 600px;
                                    margin: 0 auto;
                                }

                                h1 {
                                    color: #0056b3;
                                    font-size: 24px;
                                    margin-top: 0;
                                }

                                p {
                                    font-size: 16px;
                                    line-height: 1.5;
                                    margin: 0;
                                    padding-bottom: 20px;
                                }

                                .code {
                                    font-size: 28px;
                                    font-weight: bold;
                                    color: #0056b3;
                                    margin-bottom: 20px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class='container'>
                                <h1>Recuperación de contraseña</h1>
                                <p>Se ha generado un URL donde podrás cambiar la contraseña:</p>
                                <div class='code'>" + URL + @"</div>
                                <p>Por favor, sigue las instrucciones en el URL y cambie su contraseña por una de su preferencia.</p>
                            </div>
                        </body>
                        </html>
                        "
            };

            return emailDataManager.Send(email);
        }
    }
}
