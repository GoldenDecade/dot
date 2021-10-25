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

// new 忽略this的改变
// this的改变
/*Function.prototype.bind1 = function (context, ...args) {
    let fn = this;
    let FNOP = function () {};

    function fnToBind() {
        let obj = null;
        if(this instanceof FNOP && context) {
            obj = this;
        }else {
            obj = context;
        }
        return fn.apply(obj, args.concat(...arguments));

    }
    FNOP.prototype = fn.prototype;
    fnToBind.prototype = Object.create(FNOP.prototype);
    return fnToBind;
}
function ageFunc(age) {
    this.age = age;
}
let age = 10;
let obj = {
    age: 11
}
let bindAgeFunc = ageFunc.bind1(obj, 21);
bindAgeFunc(19);
console.log(obj.age);
console.log(age);
let bindAgeFunc1 = ageFunc.bind1(null, 28);
bindAgeFunc1();
console.log(obj.age);
console.log(age);*/



function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() {
    return this.x + ',' + this.y;
};

var p = new Point(1, 2);
p.toString(); // '1,2'

// not supported in the polyfill below,

// works fine with native bind:

var YAxisPoint = Point.bind(null, 0/*x*/);
var axisPoint = new YAxisPoint(5);
console.log(axisPoint.toString()); // 0,5
