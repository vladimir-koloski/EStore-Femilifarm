using FemiliFarmApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DataAccess
{
    public interface ICartRepository
    {
        void Insert(Cart cart);
        Cart GetCartByUserId(int id);
        void Update(Cart cart);        
    }
}
