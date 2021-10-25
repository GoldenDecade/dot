// public
// private: 只能在自己类中访问,子类或者实例均不可访问
// protected: 只能在自己的子类中访问, 场景: 当前类不可创建实例,就在 当前类的 constructor 前面 加上 protected
// readonly
// --------
// abstract
// 使用 abstract来定义 类 方法及属性和存值器函数
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
// ------
// super: 在子类中只能访问 父类的 public & protected 方法,不能访问属性
/*
class Point {
    public x: number
    public y: number
    private _str: string
    readonly sex: string
    constructor(x: number, y: number, sex: string){
        this.x = x;
        this.y = y;
        this.sex = sex;
    }
    get infoStr() {
        return this._str
    }
    set infoStr(val) {
        this._str = val;
    }
    public getPosition() {
        return `x: ${this.x}, y: ${this.y}`
    }
    private getInfoStr() {
        return this._str;
    }
}

const point = new Point(1, 2, 'man');
point.infoStr = 'abc'
// point.sex = 'woman'
console.log(point.sex);
console.log(point);
// console.log(point._str);

class P extends Point {
    constructor(x: number, y: number, sex: string) {
        super(x, y, sex);
    }
}
const p1 = new P(1, 2, 'woman');
console.log(p1);
// p1.sex = 'man'
// console.log(p1);
*/
var People = /** @class */ (function () {
    function People(name) {
        this.name = name;
    }
    return People;
}());
var P = /** @class */ (function (_super) {
    __extends(P, _super);
    function P() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return P;
}(People));
var FoodClass = /** @class */ (function () {
    function FoodClass() {
    }
    return FoodClass;
}());
// 接口继承类
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var create = function (C) {
    return new C();
};
var Infos = /** @class */ (function () {
    function Infos() {
        this.age = 18;
    }
    return Infos;
}());
console.log(create(Infos).age);
// console.log(create(Infos).name);
