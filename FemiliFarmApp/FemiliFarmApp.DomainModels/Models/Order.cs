using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FemiliFarmApp.DomainModels.Models
{
    public class Order
    {
        public int Id { get; set; }
        //public int UserId { get; set; }
        public int CartId { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;
        //public virtual ICollection<CartProduct> CartProducts { get; set; }

        //[ForeignKey(nameof(UserId))]
        //public virtual User User { get; set; }
        [ForeignKey(nameof(CartId))]
        public virtual Cart Cart { get; set; }
    }
}
