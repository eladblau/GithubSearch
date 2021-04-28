using GithubSearch.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GithubSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
    
        [HttpGet]
        public async Task<IActionResult> Get(string searchedVal)
        {
            var results = await GithubSearchApi.SearchRepositories(searchedVal);
            return Ok(results);
        }

    }
}
