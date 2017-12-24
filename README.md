# ht_middle

> A Vue.js project
 
## Build Setup

  install dependencies
	npm install || cnpm install(亲测可用11.29)

	serve with hot reload at localhost:8080
	npm run dev

	build for production with minification
	npm run build

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 如果node-sass 出错，可能是版本问题，重下载
# npm uninstall --save node-sass
# npm install --save node-sass

## 页面一般逻辑
	有弹窗的情况
	页面 -> (添加|编辑) -> （字段校验）->弹框 -> (利用id有无) -> 交互

## src/config/base_config.js 记得修改图片显示的问题，不然本地是显示不来相对路径的图片