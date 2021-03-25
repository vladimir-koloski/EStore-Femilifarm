using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Services.Interfaces
{
    public interface IOrderService
    {
        void CreateNewOrder(OrderRequestModel model);
        List<OrderDto> GetAllOrdersByUserId(int id);
        OrderDto GetOrderById(int id);
        List<OrderDto> GetAllOrders();
    }
}
