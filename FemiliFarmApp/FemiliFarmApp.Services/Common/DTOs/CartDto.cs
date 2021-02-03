using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Common.DTOs
{
    public class CartDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}
