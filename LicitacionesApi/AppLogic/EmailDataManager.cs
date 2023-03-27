using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace AppLogic
{
    public class EmailDataManager
    {
        public bool Send(Email email)
        {
            try
            {
                // servidor smtp de config
                var smtpSection = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
                string strHost = smtpSection.Network.Host;
                int port = smtpSection.Network.Port;
                string strUserName = smtpSection.Network.UserName;
                string strFromPass = smtpSection.Network.Password;

                //auntenticacion gmail
                SmtpClient smtp = new SmtpClient(strHost, port);
                MailMessage msg = new MailMessage();


                //contenido del correo 
                msg.From = new MailAddress(smtpSection.From, "Licitaciones Email");
                msg.To.Add(new MailAddress(email.Dest));
                msg.Subject = email.Subject;
                msg.IsBodyHtml = email.IsHtml;
                msg.Body = email.Body;


                //Envio
                smtp.Credentials = new NetworkCredential(strUserName, strFromPass);
                smtp.EnableSsl = true;
                smtp.Send(msg);
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
