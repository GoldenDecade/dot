function Parent(name) {
    this.name = name;
    this.info = {
        a: 1
    }
}
Parent.prototype.play = function() {
    console.log(this.name);
};
Parent.prototype.arr = [1,2,3]
let p1 = new Parent('p1')
p1.play();

function Son(name, age) {
    Parent.call(this, name);
    this.age = age;
}
// Son.prototype = Object.create(Parent.prototype);
Son.prototype = Object.assign({}, Parent.prototype);
Son.constructor = Son;

let s1 = new Son('s1', 12);
console.log(s1.arr);
s1.info.a = 2;
s1.arr.push(4)
console.log(s1.arr);
console.log(p1.arr);
