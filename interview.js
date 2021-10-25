// 1. 实现new;  new 做了什么
/*
1. 新生成一个对象
2. 将构造函数的作用域赋值给新对象（即绑定新对象的 this）
3. 执行构造函数中的代码（即为这个新对象添加属性）
4. 设置原型
5. 返回新对象
*/

function myNew(fn, ...args) {
    let instance = {};
    let res = fn.apply(instance, args); // 2 & 3 合并在一起了
    // 保证实例的原型链指向
    if(fn.prototype) {
        Object.setPrototypeOf(instance, fn.prototype);
    }
    if(typeof res === "function" || (typeof res === "object" && res !== null)) {
        return res;
    }
    return instance;
}


// 2. 原型 & 原型链
// 什么是原型? 原型就是对象的__proto__, 即person的原型就是 Person.prototype, 这个对象的构造函数的prototype (原型)
// 什么是原型链? 原型链就是 所有对象的 __proto__ 连起来的线,终点是null;
/*
* 0. 对象区分为:  普通对象  &  函数对象  &  原型对象
* 1. 所有对象都有__proto__
* 2. 所有的函数对象都有 prototype,
* 3. 所有的原型对象 都有 constructor
* 4. 函数对象 和 原型对象 通过 prototype 和 constructor 关联.
* */

// 3. call & apply & bind
// !!! 当使用 new 操作符调用绑定函数时，bind 的第一个参数无效。
Function.prototype.myCall = function(context, ...args) {
    if(!context || context === null) {
        context = window;
    }
    let fn = Symbol();
    context[fn] = this;
    return context[fn](...args);
}

Function.prototype.myApply = function (context, args) {
    if(!context || context === null) {
        context = window;
    }
    let fn = Symbol();
    context[fn] = this;
    return context[fn](...args);
}
Function.prototype.myBind = function (context, ...args) {
    if(typeof this !== 'function') {
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    let fToBind = this,
        fNop = function () {}
        fBound = function (...oargs) {
            // fn.bind(obj) --> 此时 this 指向 window
            // new fn.bind(obj) --> 此时 this.__proto__ 应指向 fn.prototype
            return fToBind.apply(fNop.prototype.isPrototypeOf(this) ? this : context, args.concat(oargs))
        }
    // 以下几行 保证 bind之后返回的函数的原型 和之前的fn.prototype 一致
    if(this.prototype) {
        fNop.prototype = this.prototype;
    }
    fBound.prototype = new fNop(); // 原型继承
    return fBound;
}
