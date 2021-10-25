Function.prototype.call1 = function (context) {
    context = context || window;
    var args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    console.log(this);
    context.fn = this;
    console.log(args);
    return context.fn(...args);
}
function foo(c) {
    console.log(this.a + this.b + c);
}
var a = 2, b = 3;
var obj = {
    a: 4,
    b: 5
}
foo.call1(obj, 9)
