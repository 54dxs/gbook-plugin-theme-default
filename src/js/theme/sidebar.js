var $ = require('jquery');

var platform = require('./platform');

var gbook = window.gbook;

// Toggle sidebar with or withour animation
function toggleSidebar(_state, animation) {
    if (gbook.state != null && isOpen() == _state) return;
    if (animation == null) animation = true;

    gbook.state.$book.toggleClass('without-animation', !animation);
    gbook.state.$book.toggleClass('with-summary', _state);

    gbook.storage.set('sidebar', isOpen());
}

// Return true if sidebar is open
function isOpen() {
    return gbook.state.$book.hasClass('with-summary');
}

// Prepare sidebar: state and toggle button
function init() {
    // Init last state if not mobile
    if (!platform.isMobile()) {
        toggleSidebar(gbook.storage.get('sidebar', true), false);
    }

    // Close sidebar after clicking a link on mobile
    $(document).on('click', '.book-summary li.chapter a', function(e) {
        if (platform.isMobile()) toggleSidebar(false, false);
    });
}

// Filter summary with a list of path
function filterSummary(paths) {
    var $summary = $('.book-summary');

    $summary.find('li').each(function() {
        var path = $(this).data('path');
        var st = paths == null || paths.indexOf(path) !== -1;

        $(this).toggle(st);
        if (st) $(this).parents('li').show();
    });
}

module.exports = {
    init: init,
    isOpen: isOpen,
    toggle: toggleSidebar,
    filter: filterSummary
};
