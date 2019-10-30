define([], function () {

    function generateBlogItem(item) {
        var template = $('#blog-card').html();
        template = template.replace('{{PostId}}', item.postId);
        template = template.replace('{{Title}}', item.title);
        template = template.replace('{{ShortDescription}}', item.shortDescription);
        template = template.replace(/{{Link}}/g, item.link);
        return template;
    }

    function appendBlogList(items) {
        var cardHtml = '';
        for (var i = 0; i < items.length; i++) {
            cardHtml += generateBlogItem(items[i]);
        }

        $('.blog-list').append(cardHtml);
    }

    function showBlogItem(html, link) {
        var template = $('#blog-item').html();
        template = template.replace(/{{Link}}/g, link);
        template = template.replace('{{Content}}', html);
        $('#blog-item-container').html(template);
    }

    function showBlogComment(name, email, text) {
        var template = $('#blog-comment').html();
        template = template.replace('{{Name}}', name);
        template = template.replace('{{Email}}', email);
        template = template.replace('{{Text}}', text);
        $('#blog-comment-container').html(template);
    }

    return {
        appendBlogList: appendBlogList,
        showBlogItem: showBlogItem
    }
});