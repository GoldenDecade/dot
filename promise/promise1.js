
// 循环引用: 如果当前 then 方法回调函数返回值是当前 then 方法产生的新的 promise 对象，则被认为是循环引用
//  TypeError: Chaining cycle detected for promise #<Promise>
/*let p = new Promise(res => res(1));
let p1 = p.then(() => {
    return p1;
});*/

/*Promise.all([1, 2, Promise.reject(3), function () {
    return 123;
}]).then(res => {
    console.log(res);
}).catch(error => {
    console.log('error');
    console.log(error);
});*/

/*Promise.race([ 1, 2, Promise.reject(3)]).then(res => {
    console.log(res);
}).catch(error => {
    console.log('error');
    console.log(error);
})*/
/*
Promise.race([ Promise.reject(3), 1, 2]).then(res => {
    console.log(res);
}).catch(error => {
    console.log('error');
    console.log(error);
})
*/

