define(['./template.js', '../lib/showdown/showdown.js', './clientStorage.js'], function (template, showdown, clientStorage) {

    var blogLatestPostsUrl = '/Home/LatestBlogPosts/';
    var blogPostUrl = '/Home/Post/?link=';
    var blogMorePostsUrl = '/Home/MoreBlogPosts/?oldestBlogPostId=';

    function fetchPromise(url, link, text) {

        link = link || '';

        return new Promise(function (resolve, reject) {
            fetch(url + link)
                .then(function (data) {

                    var resolveSuccess = function () {
                        resolve('The connection is OK, showing latest results');
                    };

                    if (text) {
                        data.text().then(function (text) {
                            clientStorage.addPostText(link, text).then(resolveSuccess);
                        });
                    }
                    else {
                        data.json().then(function (jsonData) {
                            clientStorage.addPosts(jsonData).then(resolveSuccess);
                        });
                    }

                }).catch(function (e) {
                    resolve('No connection, showing offline results');
                });

            setTimeout(function () { resolve('The connection is hanging, showing offline results'); }, 800);
        });
    }

    function loadData(url) {
        fetchPromise(url)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getPosts()
                    .then(function (posts) {
                        template.appendBlogList(posts);
                    })
            });
    }

    function loadLatestBlogPosts() {
        loadData(blogLatestPostsUrl);
    }

    function loadBlogPost(link) {

        fetchPromise(blogPostUrl, link, true)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getPostText(link)
                    .then(function (data) {
                        if (!data) {

                            var contentNotFound = $('#blog-content-not-found')
                                .html().replace(/{{Link}}/g, link);

                            template.showBlogItem(contentNotFound, link);
                        } else {
                            var converter = new showdown.Converter();
                            html = converter.makeHtml(data);
                            template.showBlogItem(html, link);
                            loadComentPost(link);
                        }
                        window.location = '#' + link;
                    })
            });
    }

    function insertComment(link) {
        var nome = $('#comentario-nome').val();
        var email = $('#comentario-email').val();
        var text = $('#comentario-text').val();
        if (nome.length < 1 || email.length < 1 || text.length < 1) {
            alert('Todos os campos são obrigatorios!');
            return;
        }
        var d = new Date();

        var key = "#comments-" + link + "-" + d.getTime();
        var value = { nome: nome, email: email, text: text };
        
        clientStorage.addComment(key, value);
    }

    function loadComentPost(link) {
        fetchPromise(link)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getPostCommentText(link)
                    .then(function (data) {
                        if (data) {
                            template.showBlogComment(name, link, text);
                        }
                    });
            });
    }

    function loadMoreBlogPosts() {
        loadData(blogMorePostsUrl + clientStorage.getOldestBlogPostId());
    }

    return {
        loadLatestBlogPosts: loadLatestBlogPosts,
        loadBlogPost: loadBlogPost,
        loadMoreBlogPosts: loadMoreBlogPosts,
        loadComentPost: loadComentPost,
        insertComment: insertComment
    }
});