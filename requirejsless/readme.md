require.js (AMD)
- AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
### 基本语法
- 4种配置方式
```js
require.config({

　　　　paths: {

　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"

　　　　}

　　});

require.config({

	paths: {

		"jquery": "lib/jquery.min",
		"underscore": "lib/underscore.min",
		"backbone": "lib/backbone.min"

	}

});
require.config({

	baseUrl: "js/lib",

	paths: {

		"jquery": "jquery.min",
		"underscore": "underscore.min",
		"backbone": "backbone.min"

	}

});

require.config({

	paths: {

		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"

	}

});
```
### 加载非规范的模块
- 理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？

- 回答是可以的。

- 这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。

- 举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。
```js
require.config({

　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},

　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}

　　　　}

　　});


```
require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
```js
{
	shim: {

		"jquery.scroll" : {

			deps: ['jquery'],

				exports: 'jQuery.fn.scroll'

		}

	}
}
```

----------
r.js 是用来将 一些 js 文件打包到一起;
- 比如 demo中:
- script 中有 a.js b.js c.js d.js
- 入口是 main.js
- 直接引用main.js 也可以; 但是会发送好多请求;
----------
如果将这些 js 文件合并到一起,就可以减少请求
```
node r.js -o baseUrl=./ name=main out=build.js
```
- o 表示 是优化项
- baseUrl=./ 是相对于 name 而言的
- name=main 指起初入口是 main.js
- out=build.js 是将这些js 文件打包为 build.js

```html
<script src="node_modules/requirejs/require.js" defer async="true" data-main="build"></script>
```
