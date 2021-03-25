using FemiliFarmApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.RequestModels.Models
{
    public class OrderRequestModel
    {
        //public int UserId { get; set; }
        public int CartId { get; set; }
        //public ICollection<CartProduct> Products { get; set; }
    }
}
