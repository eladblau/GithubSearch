using GithubSearch.Helpers;
using GithubSearch.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Octokit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GithubSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get(string username)
        {
            List<Favorite> favorites = await DBHelper.GetUserFavorites(username);
            return Ok(favorites);
        }


        [HttpGet("GetFavoriteRepositories")]
        public async Task<IActionResult> GetFavoriteRepositories(string username)
        {
            List<Favorite> favorites = await DBHelper.GetUserFavorites(username);
            List<Repository> repositories = new List<Repository>();

            foreach (Favorite f in favorites)
            {
                Repository repository = await GithubSearchApi.GetRepository(f.repoId);
                if (repository != null)
                {
                    repositories.Add(repository);
                }
            }
            return Ok(repositories);
        }

        [HttpGet("Add")]
        public async Task<IActionResult> Add(string repoId, string username)
        {
            //Add the id repository to favorites
            if (string.IsNullOrEmpty(repoId)) return Ok(new { Success = false });

            Favorite favorite = new Favorite()
            {
                repoId = long.Parse(repoId),
                username = username
            };

            string res = await DBHelper.InsertFavorite(favorite);

            return Ok(new
            {
                Success = true
            });
        }


        [HttpGet("Delete")]
        public async Task<IActionResult> Delete(string repoId, string username)
        {
            //Add the id repository to favorites
            if (string.IsNullOrEmpty(repoId)) return Ok(new { Success = false });

            Favorite favorite = new Favorite()
            {
                repoId = long.Parse(repoId),
                username = username
            };

            string res = await DBHelper.DeleteFavorite(favorite);

            return Ok(new
            {
                Success = true
            });
        }

    }
}
