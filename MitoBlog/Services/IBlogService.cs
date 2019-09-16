using MitoBlog.Models;
using System.Collections.Generic;

namespace MitoBlog.Services
{
    public interface IBlogService
    {
        List<BlogPost> GetLatestPosts();

        string GetPostText(string link);

        List<BlogPost> GetOlderPosts(int oldestPostId);
    }
}