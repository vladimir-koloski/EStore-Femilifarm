using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Services.Interfaces
{
    public interface ICartService
    {
        void CreateNewCart(CartRequestModel model);
        void UpdateCart(CartRequestModel model);
        Cart GetCartByUserId(int id);
    }
}
