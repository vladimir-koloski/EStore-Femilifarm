using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Services.Interfaces
{
    public interface ICartService
    {
        Cart CreateNewCart(CartRequestModel model);
        void UpdateCart(CartRequestModel model);
        CartDto GetCartByUserId(int id);
        void RemoveProductFromCart(CartRequestModel model);
    }
}
