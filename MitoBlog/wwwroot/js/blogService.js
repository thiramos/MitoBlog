define(['./template.js', '../lib/showdown/showdown.js'], function (template, showdown) {

    var blogLatestPostsUrl = '/Home/LatestBlogPosts/';
    var blogMorePostsUrl = '/Home/MoreBlogPosts/?oldestBlogPostId=';
    var blogPostUrl = '/Home/Post/?link=';

    var lastPostId = -1;

    function loadLatestBlogPosts() {
        fetch(blogLatestPostsUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                template.appendBlogList(data);
                if (data.length > 0) {
                    lastPostId = data[data.length - 1].postId;
                }
            });
    }

    function loadMoreBlogPosts() {
        fetch(blogMorePostsUrl + lastPostId)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                template.appendBlogList(data);
                if (data.length > 0) {
                    lastPostId = data[data.length - 1].postId;
                }
            });
    }

    function loadBlogPost(link) {
        fetch(blogPostUrl + link)
            .then(function (response) {
                return response.text();
            }).then(function (data) {

                if (!data) {
                    template.showBlogItem($('#blog-content-not-found').html(), link);
                } else {
                    var converter = new showdown.Converter();
                    html = converter.makeHtml(data);
                    template.showBlogItem(html, link);
                }
                window.location = '#' + link;
                
            });
    }
       

    return {
        loadLatestBlogPosts: loadLatestBlogPosts,
        loadMoreBlogPosts: loadMoreBlogPosts,
        loadBlogPost: loadBlogPost
    }
});