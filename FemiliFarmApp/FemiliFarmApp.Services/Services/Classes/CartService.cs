using FemiliFarmApp.DataAccess;
using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Services.Classes
{
    public class CartService : ICartService
    {
        private ICartRepository _cartRepository;
        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public void CreateNewCart(CartRequestModel model)
        {
            var cart = new Cart()
            {
                UserId = model.UserId,
                CartItems = new List<CartItems>()
            };
            _cartRepository.Insert(cart);
        }

        public Cart GetCartByUserId(int id)
        {
            return _cartRepository.GetCartByUserId(id);
        }

        //public void UpdateCart(CartRequestModel model)
        //{
        //    var cart = _cartRepository.GetCartByUserId(model.UserId);
        //    cart.CartItems.Add(model.CartItems);

        //    _cartRepository.Update(cart);
        //}
    }
}
