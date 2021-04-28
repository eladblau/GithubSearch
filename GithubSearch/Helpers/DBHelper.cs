using GithubSearch.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace GithubSearch.Helpers
{
    public static class DBHelper
    {
        private const string SQL_CONNECTIONS = "SqlConnections";
        private const string GithubSearchDatabase = "GithubSearchDatabase";


        private const string USP_INSERT_FAVORITE = "usp_InsertFavorite";
        private const string USP_GET_USER_FAVORITES = "usp_GetUserFavorites";
        private const string USP_DELETE_USER_FAVORITE = "usp_DeleteUserFavorite";



        public static async Task<List<Favorite>> GetUserFavorites(string username = null)
        {
            try
            {
                List<Favorite> favorites = new List<Favorite>();
                DataTable table = new DataTable();

                string connectionString = Startup.StaticConfig.GetSection(SQL_CONNECTIONS).GetSection(GithubSearchDatabase).Value;
                using (var con = new SqlConnection(connectionString))
                using (var cmd = new SqlCommand(USP_GET_USER_FAVORITES, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    if (!string.IsNullOrEmpty(username)) cmd.Parameters.AddWithValue("@username", username);

                    con.Open();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        table.Load(reader);
                    }
                }
                foreach (DataRow dr in table.Rows)
                {
                    favorites.Add(new Favorite()
                    {
                        id = int.Parse(dr["id"].ToString()),
                        repoId = long.Parse(dr["repoId"].ToString()),
                        username = dr["username"].ToString()
                    });
                }
                return favorites;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<string> InsertFavorite(Favorite favorite)
        {
            try
            {
                string sRes = string.Empty;
                string connectionString = Startup.StaticConfig.GetSection(SQL_CONNECTIONS).GetSection(GithubSearchDatabase).Value;
                using (var con = new SqlConnection(connectionString))
                using (var cmd = new SqlCommand(USP_INSERT_FAVORITE, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    await con.OpenAsync();
                    {
                        cmd.Parameters.AddWithValue("@repoId", favorite.repoId);
                        cmd.Parameters.AddWithValue("@username", favorite.username);

                        var res = await cmd.ExecuteNonQueryAsync();
                        sRes = res.ToString();
                    }
                    con.Close();

                    return sRes;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<string> DeleteFavorite(Favorite favorite)
        {
            try
            {
                string sRes = string.Empty;
                string connectionString = Startup.StaticConfig.GetSection(SQL_CONNECTIONS).GetSection(GithubSearchDatabase).Value;
                using (var con = new SqlConnection(connectionString))
                using (var cmd = new SqlCommand(USP_DELETE_USER_FAVORITE, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    await con.OpenAsync();
                    {
                        cmd.Parameters.AddWithValue("@repoId", favorite.repoId);
                        cmd.Parameters.AddWithValue("@username", favorite.username);

                        var res = await cmd.ExecuteNonQueryAsync();
                        sRes = res.ToString();
                    }
                    con.Close();

                    return sRes;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
