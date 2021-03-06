﻿using FemiliFarmApp.DomainModels.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.RequestModels.Models
{
    public class ProductRequestModel
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Stock { get; set; }
        public Category? Category { get; set; }
    }
}
