var $ = require('jquery');
var url = require('url');
var path = require('path');
var events = require('./events');

var started = false;
var state = {};

/*
    表示页面已更改，此函数必须在页面加载后和导航更改时由主题调用
*/
function hasChanged(ctx) {
    console.log('page has changed', ctx); // eslint-disable-line no-console
    setState(ctx);

    if (!started) {
        // 通知gbook已准备好
        started = true;
        events.trigger('start', ctx.config.pluginsConfig);
    }

    events.trigger('page.change');
}

/*
    更新当前状态

    data-level="{{ page.level }}"
    data-chapter-title="{{ page.title }}"
    data-filepath="{{ file.path }}"
    data-basepath="{{ './'|resolveFile }}"
    data-revision="{{ gbook.time }}"
    data-innerlanguage="{{ innerlanguage }}">
*/
function setState(newState) {
    // GBook v3之后的API
    state.page          = newState.page;
    state.file          = newState.file;
    state.gitbook       = newState.gitbook;
    state.config        = newState.config;
    state.basePath      = newState.basePath;
    state.book          = newState.book;

    // 已废弃
    state.$book         = $('.book');
    state.revision      = state.gitbook.time;
    state.level         = state.page.level;
    state.filepath      = state.file.path;
    state.chapterTitle  = state.page.title;
    state.innerLanguage = state.book.language || '';

    // 指向书本根目录（内部书本）的绝对url
    state.root = url.resolve(
        location.protocol+'//'+location.host,
        path.dirname(path.resolve(location.pathname.replace(/\/$/, '/index.html'), state.basePath))
    ).replace(/\/?$/, '/');

    // 语言的绝对根（对于多语言书籍）
    state.bookRoot = state.innerLanguage? url.resolve(state.root, '..') : state.root;
}

/*
    当前页的返回状态
*/
function getState() {
    return state;
}


module.exports = {
    hasChanged: hasChanged,
    setState:   setState,
    getState:   getState
};
