/*
* 配置信息
**/

+function(window) {
    requirejs.config({
        urlArgs: 'v=' + new Date().getTime(),
        baseUrl: './js/',
        paths: {
            '$': 'jquery-3.3.1.min',
        },
        // 模块处理, 处理不规范的模块
        shim: {
            '$': {
                deps: [],
                init: function(){
                    return window.jQuery.noConflict();
                }
            }
        },
        // 模块依赖
        map: {
            
        },
    });
    define('_vue', ['./js/vue.js'], function (Vue) {
        return Vue;
    });
    // 注入全局的依赖
    define('vue', ['_vue', 'drag'], function (Vue) {
        return Vue;
    });
    setTimeout(function(){
        require(['main'])
    }, 0);
}(window);
