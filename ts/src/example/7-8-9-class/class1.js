// 类只有静态方法, 没有静态属性

class Parent {
    constructor(age) {
        this.age = age;
    }
    getAge() {
        return this.age;
    }
    static setGender(gender) {
        this.gender = gender;
    }
}

class Son extends Parent{
    constructor(age, height) {
        super(age);
        this.height = height;
        // 普通方法中 super 相当于 父类的原型对象
        // console.log(super === Parent.prototype);
    }
    static getName() {
        // 静态方法中 super 相当于 Parent
        // console.log(super === Parent);
        console.log('static: ', this.name); // Son
        console.log('静态方法中: ', super.name); // Parent
    }
    sayAge() {
        console.log('sayAge');
        // 普通方法中 super 相当于 父类的原型对象
        // console.log(super === Parent.prototype);
        console.log(super.age); // undefiend
        console.log(super.name); // undefiend
    }

}
debugger
// console.log(Son.__proto__ === Parent);
Son.setGender('1');
// console.log('--Son.gender :', Son.gender);

// console.log(Son.prototype.__proto__ === Parent.prototype);

let s1 = new Son(18, 172)
/*console.log(s1);
console.log(s1.__proto__ === Son.prototype);

console.log(s1 instanceof Son);
console.log(s1 instanceof Parent);*/
Son.getName();

s1.sayAge()

// es5 与 es6 中 继承的区别?
/*
* es6中super必须写到前面,因为 ES6 中先从父类中取到实例this, 调用super之后, 再将子类的属性和方法加到这个this上
* es5中 先创建子构造函数的实例 this, 再将父构造函数的方法属性添加到这个this 上.
* */
