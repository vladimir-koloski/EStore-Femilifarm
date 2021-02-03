using System;
using System.Collections.Generic;
using System.Text;
using FemiliFarmApp.DomainModels.Enums;

namespace FemiliFarmApp.Services.Common.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; }
        public Category? Category { get; set; }
    }
}
