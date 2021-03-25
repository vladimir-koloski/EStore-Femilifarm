using FemiliFarmApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FemiliFarmApp.Services.Common.DTOs
{
        public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        //public int CartId { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public virtual ICollection<ProductDto> Products { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        //[ForeignKey(nameof(CartId))]
        //public virtual Cart Cart { get; set; }
    }
}
