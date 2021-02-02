using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DomainModels.Models
{
    public class CartItems
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public Cart Cart { get; set; }
    }
}
                                                                                                            