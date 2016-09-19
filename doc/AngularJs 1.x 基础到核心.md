title:AngualrJs 1.x 基础到核心介绍
speaker:Jesse Chiu
transition:glue
theme:universal

[slide]
# AngualrJs 1.x 基础到核心介绍
## Jesse Chiu

[slide]
# Misko Hevery
---
<div class="columns2">
	<img src="/img/MiskoHevery.jpg" width="100%" height="100%">
</div>
<small>note</small>
[note]
加入 Google 公司之前主要从事数据库/后端方面的工作。加入 Google 公司后，转向自动化测试，主要是改进 Google 的开发者工作效率，从而改善代码库。
之前并不太热衷于 JavaScript，直到老板让他涉足这一领域，并让他研究关于 JavaScript 的所有知识。
AngularJS 最初是作为一个编外项目（side project），当时想看看是否有可能让 Web 设计师（非开发者）只使用 HTML 标签来创建简单的应用程序。随着时间的推移，AngularJS 演变成了一个全面的开发框架。
2010 年是一个转折点，当时我正参与 Google Feedback 的开发。我们使用 GWT 进行开发，开发速度和项目的进展比较缓慢。我意识到，我的这个编外项目也许可以让这个产品的构建过程快一些。随后，我将 17K 大小的基于 GWT 的应用程序使用 JavaScript 进行了重写，且代码只有 1500 行。这引起了很多人的重视，公司也开始资助我们全职开发 AngularJS。
[/note]

[slide]
# AngularJs
---
<div class="columns2">
	<img src="/img/AngularJs.png" width="100%" height="100%">
</div>

<small>note</small>
[note]
AngularJS 是 Google 推出的开源 JavaScript MV*（MVW、MVVM、MVC）框架，其通过为开发者呈现一个更高层次的抽象来简化应用的开发。
AngularJS 是一款开源的 JavaScript MV*（MVW、MVVM、MVC）框架，目前由 Google 维护。AngularJS 弥补了 HTML在构建应用方面的不足，其通过使用标识符（directives）结构，来扩展 Web 应用中的 HTML 词汇，使开发者可以使用 HTML 来声明动态内容，从而使得 Web 开发和测试工作变得更加容易。
[/note]

[slide]
# AngularJs 开发的网站

- [AngularJs 中文社区](http://angularjs.cn/)
- [Worktile 让工作更简单](https://worktile.com/)
- [锤子官网](http://www.smartisan.com/#/shop)
- [知乎周刊](https://zhuanlan.zhihu.com/Weekly)
- [ionic](http://ionicframework.com/getting-started/)
- [Argo]()


[slide]
# MVC

[slide]
# 单向模式 MVC
---
<div class="columns2">
	<img src="/img/MVC01.PNG" width="100%" height="100%">
</div>

	1. View 传送指令到 Controller
	2. Controller 完成业务逻辑后，要求 Model 改变状态
	3. Model 将新的数据发送到 View，用户得到反馈

[slide]
# MVVM
---
<div class="columns2">
	<img src="/img/MVVM.PNG" width="100%" height="100%">
</div>

* 唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。Angular 和 Ember 都采用这种模式。

参考: [MVC，MVP 和 MVVM](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

------------------------------------------------------------------------
[slide]
# AngularJs 1.x 基础概念

[slide]
# 目录
- Hello World
- 表达式、模型、指令
- 作用域(scope)、控制器
- service、http、双向绑定
- select、表单校验、事件
- 包含、动画
- 依赖注入

[slide]
# AngularJs 核心


[slide]
## AngularJs Startup
	<div class="columns2">
		<img src="/img/AngularJsStartup.png" width="100%" height="100%">
	</div>
<small>note</small>
[note]
1. 浏览器载入HTML，然后把它解析成DOM。
2. 浏览器载入angular.js脚本。
3. AngularJS等到DOMContentLoaded事件触发。
4. AngularJS寻找ng-app指令，这个指令指示了应用的边界。
5. 使用ng-app中指定的模块来配置注入器($injector)。
6. 注入器是用来创建“编译服务”和“根作用域”的。
7. 编译服务是用来编译DOM并把它链接到根作用域的。
[/note]

[slide]
## AngularJs And Browser Event Loop
	<div class="columns2">
		<img src="/img/AngularJsEventLoop.jpg" width="100%" height="100%">
	</div>
1. 浏览器的事件循环等待事件的触发。所谓事件包括用户的交互操作、定时事件、或者网络事件(服务器的响应)。
2. 事件触发后，回调会被执行。此时会进入Javascript上下文。通常回调可以用来修改DOM结构。
3. 一旦回调执行完毕，浏览器就会离开Javascript上下文，并且根据DOM的修改重新渲染视图。
	
<small>note</small>
[note]
AngularJS通过使用自己的事件处理循环，改变了传统的Javascript工作流。这使得Javascript的执行被分成原始部分和拥有AngularJS执行上下文的部分。只有在AngularJS执行上下文中运行的操作，才能享受到AngularJS提供的数据绑定，异常处理，资源管理等功能和服务。你可以使用 $apply()来从普通Javascript上下文进入AngularJS执行上下文。记住，大部分情况下（如在控制器，服务中），$apply都已经被用来处理当前事件的相应指令执行过了。只有当你使用自定义的事件回调或者是使用第三方类库的回调时，才需要自己执行$apply。
[参考](http://www.angularjs.cn/A00q)
[/note]


-----------------------------------------------------------------------------
[slide]
# AngularJs $q

[slide]

## 参考
1. [$q Api](https://code.angularjs.org/1.5.0-rc.1/docs/api/ng/service/$q)
2. [ES6 Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
3. [Kris Kowal's Q.](https://github.com/kriskowal/q)
4. [AngularJs $q](http://lucky-kuku.com/2016/09/18/angular-promise/)

[slide]
# $q Methods

```javascript
	Methods:
	* defer();
	* when(value,[successCallback],[errorCallback],[progressCallback]);
	* resolve(value,[successCallback],[errorCallback],[progressCallback]);
	* reject(reason);
	* all(promise);
```

[slide]
# $q.defer()
---
```javascript
Methods：
	* resolve(value);
	* reject(reason);
	* notify(value);
Properties:
	* promise;
```
[slide]
# Promise
---
```javascript
Methods：
	* then(successCallback, errorCallback, notifyCallback)
	* catch(errorCallback) 等价于 promise.then(null, errorCallback)
	* finally(callback, notifyCallback)
```
[note]
1.) 如果之前的 then 中已经有写了 errorCallback ，处理了错误信息，则不会到下面的 catch。
2.) 如果之前的 then 中有不是 promise 的，抛出 异常未处理，也可以到 catch。
[/note]

[slide]
# then 
---
```javascript
Var ref=function(value){
	if(isPromiseLike(value)) return value;

	return{
		then:function(callback){
			Var result=defer();
			nextTick(function(){
				result.resolve(callback(value));
			});
			returnresult.promise;
		}
	};
};
```

[slide]
# ui-router
---
	https://github.com/angular-ui/ui-router

[slide]
#相关网址
---
* https://github.com/kriskowal/q
* https://code.angularjs.org/1.5.0-rc.1/docs/api/ng/service/$q

[slide style="background-image:url(/img/end.jpg)"]
<span text-align="center"><h1>Thank You</h1></span>











