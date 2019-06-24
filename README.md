# 元素拖动

    将元素拖动到指定的容器中(基于VUE + Jquery完成的demo, 有心人可以把Jquery的事件代码替换为原生)


[查看 demo](https://svonme.github.io/drag)


## 使用示例
    
```
<div>
    <span v-drag="'#content'" :clone="true" @dragsuccess="success($event)"></span>
    <div id="content"></div>
</div>
```

### v-drag

    指定该元素可以拖动到某 dom 中

### :clone

    true: 拖动时复制一个元素
    false: 拖动元素本身

### @dragsuccess

    拖动完成时触发的事件
    
```
$event = {
    target: el, // 拖动的元素
    origin: '#content' // 拖到到那个容器中
}
```
