var $ = require('jquery');

var events  = require('./events');
var storage = require('./storage');
var page = require('./page');

var isPageReady = false;
var onLoad = window.gbook || [];

// 为插件导出api
var gbook = {
    events:   events,
    page:     page,

    // 本API已废弃
    state:    page.getState(),

    // 读/写本地存储
    storage: storage,

	// 一旦gbook准备好，就push要调用的函数
    push: function(fn) {
        if (!isPageReady) onLoad.push(fn);
        else fn();
    }
};


// Modules mapping for plugins
var MODULES = {
    'gitbook': gitbook,
    'jquery':  $
};

window.gitbook = gitbook;
window.$ = $;
window.jQuery = $;
window.require = function(mods, fn) {
    mods = mods.map(function(mod) {
        mod = mod.toLowerCase();
        if (!MODULES[mod]) {
            throw new Error('GitBook module '+mod+' doesn\'t exist');
        }

        return MODULES[mod];
    });

    fn.apply(null, mods);
};

$(document).ready(function() {
    isPageReady = true;

    // Call pile of function once GitBook is ready
    $.each(onLoad, function(i, fn) {
        fn();
    });
});


