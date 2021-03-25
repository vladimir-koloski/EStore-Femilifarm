using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FemiliFarmApp.Web.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("CreateOrder")]
        public IActionResult CreateOrder([FromBody] OrderRequestModel model)
        {
            _orderService.CreateNewOrder(model);
            return Ok();
        }

        [HttpGet("GetOrdersByUserId")]
        public IActionResult GetOrdersByUserId(int id)
        {
            var orders = _orderService.GetAllOrdersByUserId(id);
            return Ok(orders);
        }

        [HttpGet("GetOrderById")]
        public IActionResult GetOrderById(int id)
        {
            var order = _orderService.GetOrderById(id);
            return Ok(order);
        }

        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            var orders = _orderService.GetAllOrders();
            return Ok(orders);
        }
    }
}
