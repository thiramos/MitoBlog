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

    function showBlogComment(data) {
        var template = $('#blog-comment').html();
        template = template.replace('{{Name}}', data.nome);
        template = template.replace('{{Email}}', data.email);
        template = template.replace('{{Text}}', data.text);
        $('#blog-comment-container').html(template);
    }

    function showBlogNotComment() {
        var template = $('#blog-not-comment').html();
        $('#blog-not-comment-container').html(template);
    }

    return {
        appendBlogList: appendBlogList,
        showBlogItem: showBlogItem,
        showBlogComment: showBlogComment,
        showBlogNotComment: showBlogNotComment
    }
});