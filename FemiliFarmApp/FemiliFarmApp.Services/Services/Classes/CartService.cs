using FemiliFarmApp.DataAccess;
using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Common.DTOs;
using FemiliFarmApp.Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FemiliFarmApp.Services.Services.Classes
{
    public class CartService : ICartService
    {
        private ICartRepository _cartRepository;
        private IRepository<Product> _productRepository;
        public CartService(ICartRepository cartRepository, IRepository<Product> productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }


        public Cart CreateNewCart(CartRequestModel model)
        {
            var cart = new Cart()
            {
                UserId = model.UserId,
                //CartProducts = new List<CartProduct>()
            };
            _cartRepository.Insert(cart);
            return cart;
        }

        public CartDto GetCartByUserId(int id)
        {
            var cart = _cartRepository.GetCartByUserId(id);

            var productDtoList = new List<ProductDto>();

            if (cart != null)
            {
                var productsIdsList = cart.CartProducts.Select(c => c.ProductId);
                var allProducts = _productRepository.GetAll();
                foreach (var product in allProducts)
                {
                    foreach (var productId in productsIdsList)
                    {
                        if (productId == product.Id)
                        {
                            var productDto = new ProductDto
                            {
                                Id = product.Id,
                                Name = product.Name,
                                Description = product.Description,
                                Stock = product.Stock,
                                Price = product.Price,
                                ImageUrl = product.ImageUrl,
                                Category = product.Category

                            };
                            productDtoList.Add(productDto);
                        }
                    }
                }

                return new CartDto
                {
                    Id = cart.Id,
                    UserId = cart.UserId,
                    Products = productDtoList
                };
            }
            else return null;

            
        }

        public void UpdateCart(CartRequestModel model)
        {
            var cart = _cartRepository.GetCartByUserId(model.UserId);
            var cartProduct = new CartProduct
            {
                CartId = cart.Id,
                ProductId = model.Product.Id
            };
            cart.CartProducts.Add(cartProduct);

            _cartRepository.Update(cart);
        }

        public void RemoveProductFromCart(CartRequestModel model)
        {
            var cart = _cartRepository.GetCartByUserId(model.UserId);
            var cartProduct = cart.CartProducts.FirstOrDefault(cp => model.Product.Id == cp.ProductId);
            cart.CartProducts.Remove(cartProduct);
            _cartRepository.Update(cart);
        }
    }

}
