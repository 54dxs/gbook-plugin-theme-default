var $ = require('jquery');

function toggleDropdown(e) {
    var $dropdown = $(e.currentTarget).parent().find('.dropdown-menu');

    $dropdown.toggleClass('open');
    e.stopPropagation();
    e.preventDefault();
}

function closeDropdown(e) {
    $('.dropdown-menu').removeClass('open');
}

// 绑定所有下拉列表
function init() {
    $(document).on('click', '.toggle-dropdown', toggleDropdown);
    $(document).on('click', '.dropdown-menu', function(e){ e.stopPropagation(); });
    $(document).on('click', closeDropdown);
}

module.exports = {
    init: init
};

