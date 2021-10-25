var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a, _b, _c, _d;
var instantiate = WebAssembly.instantiate;
var _3s1 = Symbol();
console.log(_3s1);
var _3s2 = Symbol('lison');
console.log(_3s2.toString(), _3s2.toString().length, Boolean(_3s2), !_3s2);
var _3prop1 = 'age';
var _3obj = (_a = {},
    _a[_3prop1] = 'abc',
    _a[_3s1] = 'bbb',
    _a.a = 123,
    _a);
// symbol作为 key 时, 不能被遍历到
// tslint:disable-next-line:forin
for (var key in _3obj) {
    // console.log(`%c key: ${key}`, 'color: red');
}
// console.log(Object.keys(_3obj));
// console.log(Object.getOwnPropertyNames(_3obj));
// console.log(JSON.stringify(_3obj));
// console.log(Object.getOwnPropertySymbols(_3obj));
console.log(Reflect.ownKeys(_3obj)); // ["age", "a", Symbol()]
var _3for1 = Symbol.for('lison');
var _3for2 = Symbol.for('lison');
console.log(Symbol.keyFor(_3for1)); // 'lison'
console.log(Symbol.keyFor(_3for2)); // 'lison'
// 自定义 instanceof
var obj1 = (_b = {},
    _b[Symbol.hasInstance] = function (otherObj) {
        console.log(otherObj);
    },
    _b);
// console.log({a : 'a'} instanceof (obj1 as any));
// Symbol.isConcatSpreadable
// 内置的Symbol.isConcatSpreadable符号用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素
var arr = [1, 2];
// console.log([].concat(arr)) // [1, 2]
arr[Symbol.isConcatSpreadable] = false;
// console.log([].concat(arr)) // [ [1,2] ]  返回了一个二维数组
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    C.prototype.getName1 = function () {
        return 'lison';
    };
    return C;
}(Array));
var c = new C(1, 2, 3);
var a = c.map(function (item) { return item + 1; });
// 解析如下:
/*
Array.prototype.map = function (callback) {
    var Species = this.constructor[Symbol.species];// 返回 Array
    var returnValue = new Species(this.length);
    this.forEach(function (item, index, array) {
        returnValue[index] = callback(item, index, array);
    });
    return returnValue;
}
*/
var _s3obj3 = (_c = {},
    _c[Symbol.match] = function (str) {
        console.log(str.length);
    },
    _c[Symbol.split] = function (str) {
        console.log('split', str.length);
    },
    _c);
console.log('abcde'.match(_s3obj3));
// 自定义这些方法
// Symbol.replace
// Symbol.search
// Symbol.split
var _s4obj4 = (_d = {},
    _d[Symbol.toPrimitive] = function (type) {
        console.log(type);
    },
    _d);
