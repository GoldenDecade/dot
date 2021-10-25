function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype);
    let res = fn.apply(obj, args);
    return ['object', 'function'].includes(typeof res)  ? res : obj;
}

let p1 = myNew(function Person(name, age) {
    this.name = name;
    this.age = age;
}, 'a', 12)
console.log(p1);
