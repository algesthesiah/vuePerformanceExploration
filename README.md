# test-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 总结

用一个组件渲染，会导致任何一个改动都会rerender。按照优化的第二点，任何的展开与关闭，其实还是要对比前后的VDOM。节点数量更多的情况下，计算量还是相当可观的。应该拆成递归组件的形式，这样局部的更新不会重新计算整一个树组件，性能会有很大提升的

冻结数据对于提升不大
