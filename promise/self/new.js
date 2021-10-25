function Person(name, age) {
    this.name = name;
    this.age = age;
    return {name: 9, age: 9};
}

let p1 = new Person('a', 1);
// console.log(p1);

function a() {
    console.log([].shift.call(arguments));
}
a()
