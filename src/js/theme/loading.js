var gbook = window.gbook;

function showLoading(p) {
    gbook.state.$book.addClass('is-loading');
    p.always(function() {
        gbook.state.$book.removeClass('is-loading');
    });

    return p;
}

module.exports = {
    show: showLoading
};
