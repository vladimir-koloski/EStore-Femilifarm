using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.RequestModels.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
