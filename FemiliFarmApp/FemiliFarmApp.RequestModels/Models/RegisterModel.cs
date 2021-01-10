﻿using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.RequestModels.Models
{
    public class RegisterModel
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
