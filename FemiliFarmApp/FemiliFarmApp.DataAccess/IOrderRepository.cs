using FemiliFarmApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DataAccess
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAll();
        void Insert(Order order);
        Order GetOrderById(int id);
        //void Update(Order order);
    }
}
