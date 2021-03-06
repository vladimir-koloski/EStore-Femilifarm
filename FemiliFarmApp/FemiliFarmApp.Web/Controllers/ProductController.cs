﻿using FemiliFarmApp.DomainModels.Enums;
using FemiliFarmApp.RequestModels.Models;
using FemiliFarmApp.Services.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FemiliFarmApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetProducts")]
        public IActionResult GetProducts([FromQuery] string name,
                                         [FromQuery] Category? category)
        {

            var requestModel = new ProductRequestModel()
            {
                Name = name,
                Category = category
            };

            var response = _productService.GetProducts(requestModel);
            return Ok(response);
        }

        [HttpPost("AddProduct")]
        public IActionResult AddProduct([FromBody] ProductRequestModel request)
        {
            _productService.CreateProduct(request);
            return Ok();
        }

        [HttpPost("EditProduct")]
        public IActionResult EditProduct([FromBody] ProductRequestModel request)
        {
            _productService.EditProduct(request);
            return Ok();
        }

        [HttpDelete("DeleteProduct")]
        public IActionResult DeleteProduct([FromQuery] int id)
        {

            _productService.DeleteProduct(id);
            return Ok();
        }

        [HttpGet("GetProductById")]
        public IActionResult GetProductById([FromQuery] int id)
        {
            var product = _productService.GetProductById(id);
            return Ok(product);
        }

        [HttpGet("SellProduct")]
        public IActionResult SellProduct([FromQuery] int id)
        {
            var product = _productService.SellProduct(id);
            return Ok(product);
        }

    }
}
