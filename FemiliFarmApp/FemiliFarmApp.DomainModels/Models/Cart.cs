using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DomainModels.Models
{
    public class Cart
    {

        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Product> Products { get; set; }
        
    }
}
