function currying(fn, ...args) {
    return function () {
        // return fn.apply(null, args.concat(...arguments))
        return fn(...[...args, ...arguments]);
    }
}
const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2,3))
