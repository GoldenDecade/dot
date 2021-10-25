/*var arr = [1, 2, 3],
sum = arr.reduce((prev, cur, index, arr) => {
    console.log('---');
    console.log(prev);
    console.log(cur);
    return prev + cur;
});
console.log(sum);*/

// fn4(fn3(fn2(fn1(...args))))

function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}

function compose(...fn) {
    console.log(fn);// 默认是 []
    if(!fn.length) return (v) => v;
    if(fn.length === 1) return fn[0];
    return fn.reduce((prev, cur) => {
        return (...args) => prev(cur(...args))
    })
}
var res = compose(fn1, fn2, fn3, fn4);
console.log(res(1));

