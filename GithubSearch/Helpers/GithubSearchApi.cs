using Newtonsoft.Json;
using Octokit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace GithubSearch.Helpers
{
    public static class GithubSearchApi
    {
        private static string baseUrl = Startup.StaticConfig.GetSection("MyAppSettings").GetSection("GithubBaseUrl").Value;

        public static async Task<SearchRepositoryResult> SearchRepositories(string searchedVal)
        {
            try
            {
                var client = new GitHubClient(new Octokit.ProductHeaderValue("octokit"));
                SearchRepositoryResult repos = await client.Search.SearchRepo(new SearchRepositoriesRequest(searchedVal));
                return repos;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<Repository> GetRepository(long repoId)
        {
            try
            {
                var client = new GitHubClient(new Octokit.ProductHeaderValue("octokit"));
                Repository repo = await client.Repository.Get(repoId);
                return repo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
