using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AppLogic
{
    public class Validaciones
    {

        public string GenerarCodigoAlfanumerico()
        {
            Random random = new Random();
            const string caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] codigo = new char[8];
            for (int i = 0; i < codigo.Length; i++)
            {
                codigo[i] = caracteres[random.Next(caracteres.Length)];
            }
            return new string(codigo);
        }


        public  bool ValidCorreo(string correo)
        {
            string patron = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (Regex.IsMatch(correo, patron))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public  bool ValidTexto(string text)
        {
            string patron = "^[a-zA-Z ]+$";

            if (Regex.IsMatch(text, patron))
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        public  bool ValidarTelefono(string telefono)
        {
            string patron = "^[0-9]{8}$";

            if (Regex.IsMatch(telefono, patron))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public  bool ValidarIdentificacion(string id)
        {

            string patron = "^[0-9]{9}$";

            if (Regex.IsMatch(id, patron))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public  bool ValidContrasena(string contrasena)
        {
            string patron = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,21}$";

            if (Regex.IsMatch(contrasena, patron))
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        public bool ValidarNumero(double num)
        {
                if (num > 0)
                {
                    return true;
                }
            return false;
        }

        public bool ValidarNumeroPositivo(int num)
        {
            if (num >= 0)
            {
                return true;
            }
            return false;
        }



    }
}
