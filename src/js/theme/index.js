var dropdown =   require('./dropdown');
var keyboard =   require('./keyboard');
var navigation = require('./navigation');
var sidebar =    require('./sidebar');
var toolbar =    require('./toolbar');

var gbook = window.gbook;

function init() {
    // 初始化 侧边栏
    sidebar.init();

    // 初始化键盘事件
    keyboard.init();

    // 绑定下拉列表
    dropdown.init();

    // 初始化 导航
    navigation.init();

    // 添加操作以切换边栏
    toolbar.createButton({
        index: 0,
        icon: 'fa fa-align-justify',
        onClick: function(e) {
            e.preventDefault();
            sidebar.toggle();
        }
    });
}

gbook.events.on('start', init);

gbook.keyboard = keyboard;
gbook.navigation = navigation;
gbook.sidebar = sidebar;
gbook.toolbar = toolbar;
