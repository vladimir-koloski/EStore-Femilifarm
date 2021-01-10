using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Services.Interfaces
{
    public interface IUserService
    {
        UserModel Login(string username, string password);
        void Register(RegisterModel request);
        User FindByUserName(RegisterModel request);
        User FindByEmail(RegisterModel request);
    }
}
