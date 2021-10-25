// public
// private: 只能在自己类中访问,子类或者实例均不可访问
// protected: 只能在自己的子类中访问, 场景: 当前类不可创建实例,就在 当前类的 constructor 前面 加上 protected
// readonly
// --------
// abstract
// 使用 abstract来定义 类 方法及属性和存值器函数

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



abstract class People {
    protected constructor(public name: string) {}
    abstract get insideName(): string
    abstract set insideName(value: string)
}
class P extends People {
    public _name: string
    public insideName: string
}
// 接口实现类, 里面的属性必须保证实例上有
interface FoodInterface {
    type: string
}
class FoodClass implements FoodInterface {
    public type: string
}

// 接口继承类
class A {
    protected name: string
}
interface I extends A {}
class B extends A implements I {
    public name: string
}

const create = <T>(C: new() => T):T => {
    return new C();
}
class Infos {
    public age: number
    constructor() {
        this.age = 18;
    }
}

console.log(create(Infos).age);
// console.log(create(Infos).name);
