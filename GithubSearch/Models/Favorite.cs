using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GithubSearch.Models
{
    public class Favorite
    {
        public int id { get; set; }
        public long repoId { get; set; }
        public string username { get; set; }
    }
}
