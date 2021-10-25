var handler = function (b) {
    console.log(this.a);
    this.b = b;
}
var obj = {
    a: 2,
    c: 3
}
Reflect.apply(handler, obj, []); // 第三个参数必须是一个数组或者类数组


var p1 = Reflect.construct(handler, ['3'])
console.log(p1);


console.log(Reflect.getPrototypeOf(obj));
console.log(Reflect.getOwnPropertyDescriptor(obj));
console.log(Reflect.get(obj, a));
console.log(Reflect.deleteProperty(obj, c));
Object.isExtensible();

Reflect.ownKeys(obj) === [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
