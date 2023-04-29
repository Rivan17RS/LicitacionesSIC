using AppLogic;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class EmailController : ApiController
    {
        [HttpPost]
        // create stockproductos
        public bool EnviarEmail(Email email)
        {
            EmailDataManager dataManager = new EmailDataManager();
            return dataManager.Send(email);
        }
    }
}
