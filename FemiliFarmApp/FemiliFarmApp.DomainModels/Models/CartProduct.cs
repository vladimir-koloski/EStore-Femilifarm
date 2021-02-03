using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FemiliFarmApp.DomainModels.Models
{
    public class CartProduct
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }

        [ForeignKey(nameof(CartId))]
        public Cart Cart { get; set; }
        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }
    }
}
