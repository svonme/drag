define(['vue', '$'], function(Vue, $) {
    new Vue({
        name: 'App',
        el: '.main',
        data: {
            list: [1,2,3,4,5,6,7,8,9,10],
            dragList: []
        },
        computed: {
            dragQuerySelector() {
                return '.content, .content > .item'
            }
        },
        methods: {
            includes: function (value) {
                let status = false
                for(let i = 0; i < this.dragList.length; i++) {
                    let item = this.dragList[i]
                    if (item.includes(value)) {
                        status = true
                        break
                    }
                }
                return status
            },
            success: function (name, e) {
                let dragList = [].concat(this.dragList)
                let origin = $(e['origin'])
                let grade = parseInt(origin.data('grade'))
                // 顶层
                if(grade === 0) {
                    let tmp = []
                    tmp.push(name)
                    dragList.push(tmp)
                } else if(grade === 1) {
                    let index = origin.data('index')
                    let item = [].concat(dragList[index] || [])
                    item.push(name)
                    dragList[index] = item
                }
                Object.assign(this.$data, {
                    dragList: dragList
                })
            }
        }
    })
});
