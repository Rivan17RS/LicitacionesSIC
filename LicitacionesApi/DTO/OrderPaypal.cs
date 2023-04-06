using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class OrderPaypal
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
    }
}
