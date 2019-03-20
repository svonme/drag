define(['vue', '$'], function(Vue, $) {
    new Vue({
        name: 'App',
        el: '.main',
        data: {
            list: [1,2,3,4,5,6,7,8,9,10],
            con1: [],
            con2: [],
        },
        methods: {
            includes: function (value) {
                if (this.con1.includes(value) || this.con2.includes(value)) {
                    return true;
                }
                return false;
            },
            success: function (id, e) {
                var origin = $(e['origin']);
                var key = origin.data('key');
                var data = [].concat(this[key]);
                data.push(id);
                var obj = {};
                obj[key] = data;
                Object.assign(this.$data, obj);
            }
        }
    })
});

