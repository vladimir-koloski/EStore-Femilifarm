using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FemiliFarmApp.Services.Services.Interfaces
{
    public interface IProductService
    {
        IEnumerable<Product> GetProducts(ProductRequestModel requestModel);
        void CreateProduct(ProductRequestModel model);
        void DeleteProduct(int id);
        Product GetProductById(int id);
        Product SellProduct(int id);
        void EditProduct(ProductRequestModel model);
    }
}
