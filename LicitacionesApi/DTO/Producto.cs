﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Producto:BaseEntity
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int StockCantidad { get; set; }
        public int IdAdmin { get; set; }
        public DateTime FechaRegistro { get; set; }



    }
}
