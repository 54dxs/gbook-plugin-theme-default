var baseKey = '';

/*
 * 在浏览器的本地存储器中存储数据的简单模块
 */
module.exports = {
    setBaseKey: function(key) {
        baseKey = key;
    },

    // 写入值到本地存储
    set: function(key, value) {
        key = baseKey+':'+key;

        try {
            localStorage[key] = JSON.stringify(value);
        } catch(e) {}   // eslint-disable-line no-empty
    },

    // 从本地存储读取值
    get: function(key, def) {
        var value;
        key = baseKey+':'+key;
        // 这里需要一个try块，因为禁用浏览器cookies时无法访问window.localStorage
        try {
            value = localStorage[key];
        } catch(e) {}   // eslint-disable-line no-empty

        if (value === undefined) return def;

        try {
            var parsed = JSON.parse(value);
            return parsed == null ? def : parsed;
        } catch(err) {
            return value || def;
        }
    },

    // 根据key删除本地存储的一个值
    remove: function(key) {
        key = baseKey+':'+key;
        try {
            localStorage.removeItem(key);
        } catch(e) {}   // eslint-disable-line no-empty
    }
};
