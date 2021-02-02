using FemiliFarmApp.DataAccess;
using FemiliFarmApp.DomainModels.Models;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.RequestModels.Models.SettingsModels;
using FemiliFarmApp.Services.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FemiliFarmApp.Services.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IOptions<JwtSettings> _jwtSettings;
        public UserService(IRepository<User> userRepository,
                           IOptions<JwtSettings> jwtSettings)
        {
            _userRepository = userRepository;
            _jwtSettings = jwtSettings;
        }
        public UserModel Login(string username, string password)
        {
            var user = _userRepository.GetAll().FirstOrDefault(u => u.UserName == username);
            if(user == null)
            {
                throw new Exception("User with that username does not exists");
            }

            var hashedPassword = HashPassword(password);
            if(user.Password != hashedPassword)
            {
                throw new Exception("User password does not match with user");
            }
            var token = GenerateJwtToken(user);

            var userModel = new UserModel()
            {
                Id = user.Id,
                Username = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                Token = token
            };

            return userModel;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Encoding.ASCII.GetBytes(_jwtSettings.Value.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim("Username", user.UserName),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("role", user.RoleId),
                    }),
                Expires = DateTime.UtcNow.AddDays(_jwtSettings.Value.ExpireDays),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public void Register(RegisterModel request)
        {
            var hashedPassword = HashPassword(request.Password);            

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                UserName = request.UserName,
                Password = hashedPassword,
                RoleId = 1
            };

            _userRepository.Insert(user);
        }



        private string HashPassword(string password)
        {
            var md5 = new MD5CryptoServiceProvider();
            var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(password));
            return Encoding.ASCII.GetString(md5data);
        }

        public User FindByUserName(RegisterModel request)
        {
            return _userRepository.GetAll().FirstOrDefault(u => request.UserName == u.UserName);
        }
        public User FindByEmail(RegisterModel request)
        {
            return _userRepository.GetAll().FirstOrDefault(u => request.Email == u.Email);
        }
    }
}
