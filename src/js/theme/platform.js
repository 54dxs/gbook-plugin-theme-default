var $ = require('jquery');

module.exports = {
    isMobile: function() {
        return ($(document).width() <= 600);
    },
    // 导航链接位置断点
    isSmallScreen: function() {
        return ($(document).width() <= 1240);
    }
};
