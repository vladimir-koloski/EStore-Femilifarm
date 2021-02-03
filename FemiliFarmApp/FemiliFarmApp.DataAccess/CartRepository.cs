using FemiliFarmApp.DomainModels;
using FemiliFarmApp.DomainModels.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FemiliFarmApp.DataAccess
{
    public class CartRepository : ICartRepository
    {
        private readonly FemiliDbContext _context;
        public CartRepository(FemiliDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Cart> GetAll()
        {
            return _context.Carts;
        }

        public Cart GetCartByUserId(int id)
        {
            return _context.Carts.Include(c => c.CartProducts).FirstOrDefault(x => x.UserId == id);
        }

        public void Insert(Cart cart)
        {
            _context.Carts.Add(cart);
            _context.SaveChanges();
        }

        public void Update(Cart cart)
        {
            _context.Carts.Update(cart);
            _context.SaveChanges();
        }


    }
}
