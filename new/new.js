function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log('say');
}
var p1 = new Person('wq', 27);
p1.say();
console.log(p1);

// 实现new;  new 做了什么
/*
1. 新生成一个对象
2. 将构造函数的作用域赋值给新对象（即绑定新对象的 this）
3. 执行构造函数中的代码（即为这个新对象添加属性）
4. 返回新对象
*/

function myNew(fn, ...args) {
    let instance = {};
    if(fn.prototype) {
        Object.setPrototypeOf(instance, fn.prototype);
    }
    let res = fn.apply(instance, args);
    if(typeof res === "function" || (typeof res === "object" && res !== null)) {
        return res;
    }
    return instance;
}

/*let p2 = myNew(Person, 'wx', 18);
console.log(p2);
p2.say()*/
