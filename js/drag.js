/*
    拖动
*/
define(['$', '_vue'], function($, Vue) {
    // 绑定事件
    function on(element, name, callback) {
        function app(e) {
            e.preventDefault(); // 取消事件默认行为
            e.stopPropagation(); // 取消事件冒泡
            if (callback) {
                callback(e);
            }
        }
        $(element).on(name, app);
    }
    // 删除事件
    function off(element, name) {
        $(element).off(name);
    }
    // 添加 class
    function addClass(el, name) {
        var value = [].concat(name);
        $(el).addClass(value.join(' '));
    }
    // 删除 class
    function removeClass(el, name) {
        var value = [].concat(name);
        $(el).removeClass(value.join(' '));
    }
    // 设置样式
    function style(el, opt) {
        $(el).css(opt);
    }
    // 获取元素坐标
    function offset (el) {
        var $dom = $(el);
        var _offset = $dom.offset();
        _offset['right'] = _offset.left + $dom.innerWidth();
        _offset['bottom'] = _offset.top + $dom.innerHeight();
        return _offset;
    }
    // 计算元素重叠
    function overlap(drag, origin) {
        var offset1 = offset(drag);
        var dom = $(origin);
        var index = -1;
        for(var i = 0, size = dom.length; i < size; i++) {
            var offset2 = offset(dom.eq(i));
            if (offset1.left > offset2.left && offset1.right < offset2.right) {
                if (offset1.top > offset2.top && offset1.bottom < offset2.bottom) {
                    index = i;
                    break;
                }
            }
        }
        if (index >= 0) {
            return dom.get(index);
        }
        return false;
    }

    function Drag(el, opt, VNode) {
        if (!opt.value) {
            return false;
        }
        var down = false;
        var lap = false;
        var time;
        var dom;

        function getDom () {
            var data = VNode['data'] || {};
            var attrs = data['attrs'] || {};
            if (attrs.clone) {
                var tmp = $(el).clone();
                $(el).after(tmp);
                return tmp;
            }
            return $(el);
        }
        function removeDom (status) {
            var data = VNode['data'] || {};
            var attrs = data['attrs'] || {};
            if (attrs.clone) {
                $(dom).remove();
            }
            if (status && attrs.remove) {
                $(el).remove();
            }
            dom = false;
        }
        // 绑定鼠标按下事件
        on(el, 'mousedown.drag', function (e) {
            down = true; // 按下鼠标
            if (!dom) {
                dom = getDom();
            }
            addClass(dom, 'drag-on'); // 标记开始拖动
            style(dom, {
                left: e.clientX + 'px',
                top: e.clientY + 'px',
            });

            time = new Date().getTime();
            // 鼠标移动
            on(document, 'mousemove.' + time, function (emove) {
                if (down) {
                    addClass(dom, 'drag-move'); // 拖动中
                    style(dom, {
                        left: (emove.clientX - $(el).width() / 2) + 'px',
                        top: (emove.clientY - $(el).height() / 2) + 'px',
                    });
                    lap = overlap(dom, opt.value);
                    if (lap) {
                        addClass(lap, 'hover');
                    } else {
                        lap = false;
                        removeClass(opt.value, 'hover');
                    }
                }
            });
            // 鼠标抬起
            on(dom, 'mouseup.drag', function () {
                off(document, 'mousemove.' + time); // 删除 move 事件
                removeClass(dom, ['drag-on', 'drag-move']); // 拖动完成删除拖动标识
                style(dom, {
                    left: '0',
                    top: '0',
                });
                if (lap) {
                    if (VNode.data && VNode.data.attrs) {
                        var append = VNode.data.attrs['append'];
                        if (append) {
                            var clone = $(el).get(0);
                            $(lap).append(clone);
                        }
                    }
                    if (VNode.data && VNode.data.on) {
                        var dragsuccess = VNode.data.on['dragsuccess'];
                        if (dragsuccess) {
                            dragsuccess({
                                target: el,
                                origin: lap
                            });
                        }
                    }
                }
                removeDom(lap);
                lap = false;
                down = false; // 鼠标弹起
                removeClass(opt.value, 'hover');
            });
        });
    }
    // 设置指令
    Vue.directive('drag', {
        inserted: function(el, opt, VNode){
            Drag(el, opt, VNode);
        },
        // 准备
        bind: function (el, opt) {
        },
        // 更新
        update: function (el, opt) {
        },
        // 清理, 删除
        unbind: function (el, opt) {
            // 删除事件
            off(el, 'mousedown.drag');
            off(el, 'mouseup.drag');
        }
    });
})