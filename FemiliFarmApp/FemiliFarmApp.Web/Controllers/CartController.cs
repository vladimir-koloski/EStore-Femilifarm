 using System;
using System.Collections.Generic;
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
    public class CartController : ControllerBase
    {
        private ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("CreateCart")]
        public IActionResult CreateCart([FromBody] CartRequestModel request)
        {
            var cart = _cartService.GetCartByUserId(request.UserId);
            if(cart == null)
            {
                _cartService.CreateNewCart(request);
            }

            return Ok();
        }

        [HttpPost("UpdateCart")]
        public IActionResult UpdateOrder([FromBody] CartRequestModel request)
        {
            _cartService.UpdateCart(request);
            return Ok();
        }

        [HttpPost("GetCart")]
        public IActionResult GetCart([FromQuery] int userId)
        {
            var cart = _cartService.GetCartByUserId(userId);
            return Ok(cart);
        }
    }
}