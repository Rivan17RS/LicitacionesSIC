using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Email
    {
        public string Dest { get; set; }
        public string Subject { get; set; }
        public bool IsHtml { get; set; }
        public string Body { get; set; }
    }
}
