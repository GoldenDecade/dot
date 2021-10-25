var add;
add = function (arg1, arg2) { return arg1 + arg2; };
var add1 = function (a, b) { return a + b; };
add1(1, 2);
var add2 = function (a, b, c) { return a + b + c; };
// rest ...
function rest1(arg1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log(args.length);
    return [1];
}
console.log(rest1('1', 2, 3, 4));
function handleData(x) {
    if (typeof x === 'string') {
        return x.split('');
    }
    else if (typeof x === 'number') {
        return [x];
    }
}
handleData('a');
handleData(2);
