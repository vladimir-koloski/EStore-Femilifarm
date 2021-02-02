using FemiliFarmApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.RequestModels.Models
{
    public class CartRequestModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public IEnumerable<CartItems> CartItems { get; set; }
    }
}
