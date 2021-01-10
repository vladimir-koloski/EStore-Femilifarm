﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FemiliFarmApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AliveController : ControllerBase
    {
        [HttpGet("isAlive")]
        public IActionResult IsAlive()
        {            
            return Ok(new { message = "everything is ok" });
        }
    }
}