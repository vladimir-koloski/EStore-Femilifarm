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
    public class OrderService : IOrderService
    {
        private IOrderRepository _orderRepository;
        private IRepository<Product> _productRepository;
        private IRepository<User> _userRepository;

        public OrderService(IOrderRepository orderRepository, IRepository<Product> productRepository, IRepository<User> userRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;

        }

        public void CreateNewOrder (OrderRequestModel model)
        {
            var order = new Order()
            {
                CartId = model.CartId
            };
            _orderRepository.Insert(order);
        }

        public Order GetOrderByUserId(int id)
        {
            return _orderRepository.GetOrderById(id);
        }

        public List<OrderDto> GetAllOrders()
        {
            var ordersDto = new List<OrderDto>();
            var orders = _orderRepository.GetAll().ToList();
            foreach (var order in orders)
            {
                var productsIdsList = order.Cart.CartProducts.Select(cp => cp.ProductId);
                var allProducts = _productRepository.GetAll();
                var productDtoList = MapProductToProductDto(allProducts, productsIdsList);
                var user = _userRepository.GetAll().FirstOrDefault(x => x.Id == order.Cart.UserId);
                var orderDto = new OrderDto()
                {
                    Id = order.Id,
                    UserId = order.Cart.UserId,
                    Username = user.UserName,
                    Products = productDtoList,
                    CreatedOn = order.CreatedOn
                };
                ordersDto.Add(orderDto);
            }

            return ordersDto;
        }

        public OrderDto GetOrderById(int id)
        {
            var order = _orderRepository.GetOrderById(id);
            var productsIdsList = order.Cart.CartProducts.Select(cp => cp.ProductId);
            var allProducts = _productRepository.GetAll();
            var productDtoList = MapProductToProductDto(allProducts, productsIdsList);
            var orderDto = new OrderDto()
            {
                Id = order.Id,
                UserId = order.Cart.UserId,
                Products = productDtoList
            };
            return orderDto;
        }

        public List<OrderDto> GetAllOrdersByUserId(int id)
        {
            var ordersDtoList = new List<OrderDto>();
            var orders = _orderRepository.GetAll().Where(o => o.Cart.UserId == id).ToList();
            foreach (var order in orders)
            {
                var productsIdsList = order.Cart.CartProducts.Select(cp => cp.ProductId);
                var allProducts = _productRepository.GetAll();
                var productDtoList = MapProductToProductDto(allProducts, productsIdsList);
                var orderDto = new OrderDto()
                {
                    Id = order.Id,
                    UserId = order.Cart.UserId,
                    Products = productDtoList
                };
                ordersDtoList.Add(orderDto);            
            }
            return ordersDtoList;
        }

        private static List<ProductDto> MapProductToProductDto(IEnumerable<Product> allProducts, IEnumerable<int>productsIdsList)
        {
            var productDtoList = new List<ProductDto>();
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
            return productDtoList;
        }
    }
}
