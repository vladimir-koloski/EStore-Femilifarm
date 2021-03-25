using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FemiliFarmApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel request)
        {
            var userNameExist = _userService.FindByUserName(request);
            if (userNameExist != null)
            {
                return BadRequest("This username is already used!");
            }
            var mailExist = _userService.FindByEmail(request);
            if (mailExist != null)
            {
                return BadRequest("This email address is already used!");
            }
            try
            {
                _userService.Register(request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public ActionResult<UserModel> Login([FromBody]LoginRequestModel request)
        {
            try
                {
                var response = _userService.Login(request.UserName, request.Password);
                Debug.WriteLine($"{response.FullName} has been loged in");
                return Ok(response);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest("Something went wrong!");
            }

        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpDelete("DeleteUser")]
        public IActionResult DeleteUser([FromQuery] int id)
        {
            _userService.Delete(id);
            return Ok();
        }

        [HttpPost("EditUser")]
        public IActionResult EditUser([FromBody] UserModel model)
        {
            _userService.Update(model);
            return Ok();
        }


    }
}