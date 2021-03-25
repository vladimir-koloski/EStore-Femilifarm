using FemiliFarmApp.DomainModels;
using FemiliFarmApp.DomainModels.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FemiliFarmApp.DataAccess
{
    public class OrderRepository : IOrderRepository
    {
        private readonly FemiliDbContext _context;
        public OrderRepository(FemiliDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Order> GetAll()
        {
            return _context.Orders.Include(o => o.Cart.CartProducts);
        }

        public Order GetOrderById(int id)
        {
            var order = _context.Orders.Include(o => o.Cart.CartProducts).FirstOrDefault(x => x.Id == id);
            if (order != null)
            {
                return order;
            }
            else return null;
        }

        public void Insert(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public void Update(Cart cart)
        {
            _context.Carts.Update(cart);
            _context.SaveChanges();
        }
    }
}
