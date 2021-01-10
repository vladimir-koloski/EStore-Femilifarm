using FemiliFarmApp.DataAccess;
using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Common.Exceptions;
using FemiliFarmApp.Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FemiliFarmApp.Services.Services.Classes
{
    public class ProductService : IProductService
    {

        private readonly IRepository<Product> _productRepository;
        public ProductService(IRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        public IEnumerable<Product> GetProducts(ProductRequestModel requestModel)
        {
            var products = _productRepository.GetAll();
            var filteredList = new List<Product>();
            foreach (var product in products)
            {
                if(product.Name.ToLower()  == requestModel.Name | product.Category == requestModel.Category)
                {
                    filteredList.Add(product);
                }
            }
            if (filteredList.Count != 0)
            {
                return filteredList;
            }
            else
            {
                return products;
            } 
        }

        

        public void CreateProduct(ProductRequestModel request)
        {
            var product = new Product
            {
                Price = request.Price,
                Name = request.Name,
                Description = request.Description,
                Category = request.Category,
                ImageUrl = request.ImageUrl,
                Stock = request.Stock
            };
             _productRepository.Insert(product);
        }

        public void DeleteProduct(int id)
        {
            var product = _productRepository.GetAll().FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                throw new ResourceNotFoundException(nameof(Product), id);
            }
            _productRepository.Remove(product);
        }

        public Product GetProductById(int id)
        {
            return _productRepository.GetAll().Where(p => p.Id == id).FirstOrDefault();
        }

        



    }
}
