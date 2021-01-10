using FemiliFarmApp.DomainModels;
using FemiliFarmApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DataAccess
{
    public class ProductRepository : IRepository<Product>
    {
        private readonly FemiliDbContext _context;
        public ProductRepository(FemiliDbContext context)
        {
            _context = context;
        }


        public IEnumerable<Product> GetAll()
        {
            return _context.Products;
        }
        public void Insert(Product entity)
        {
            _context.Products.Add(entity);
            _context.SaveChanges();
        }

        public void Remove(Product entity)
        {
            _context.Products.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Product entity)
        {
            _context.Products.Update(entity);
            _context.SaveChanges();
        }

        
    }
}
