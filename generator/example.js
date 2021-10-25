// ---
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
for(let [key, value] of foo()) {
    console.log(`${key} : ${value}`);
}
/*let it = foo();
console.log(it);
console.log(it.next()); // { value: 1, done: true }
console.log(it.next()); // { value: 2, done: true }
console.log(it.next()); // { value: 3, done: true }
console.log(it.next()); // { value: 4, done: true }*/
//-----
function* foo1(x) {
    let y =  x * (yield );
    return y;
}
let a = foo1(6);
/*console.log(a.next());// {value: undefined, done: false}
console.log(a.next(2)); // {value: 12, done: true}
console.log(a.next());// {value: undefined, done: true}*/
// next(参数) 传入的参数是作为yield 的返回值, 不传参就是undefined; 与yield本身的返回值无关

//------
var x = 1;
function *foo2() {
    x++;
    yield; // 暂停！
    console.log( "x:", x );
}
function bar() {
    x++;
}
// 构造一个迭代器it来控制这个生成器
/*var it = foo2();
// 这里启动foo2()！
console.log(it.next()); // { value: undefined, done: false }
console.log(x); // 2
bar();
console.log(x); // 3
console.log(it.next()); //  "x": 3   { value: undefined, done: true } 说明会先执行里面的语句,最后执行自身的next

console.log(it.next()); // { value: undefined, done: true }*/


// -----
function *circle() {
    var i = 0, z = 0;
    while(i < 5) {
        i++;
        console.log(i);
        let x ;
        x = yield (z * 2);
        console.log('z : ', z);
        console.log('x : ', x);
    }
    console.log(i);
}
/*let it = circle();
console.log(it.next()); // 1  {value: 0, done: false}
console.log(it.next(9));// z: 0  x: 9 --- 2 {value: 0, done: false}
console.log(it.next(8));// z: 0  x: 8 --- 3 {value: 0, done: false}
console.log(it.next(7));// z: 0  x: 7 --- 4 {value: 0, done: false}
console.log(it.next(6));// z: 0  x: 6 --- 5 {value: 0, done: false}
console.log(it.next(5));// z: 0  x: 5 --- 5 {value: undefined, done: true}*/


// 迭代器: 原理就是这个对象有 Symbol.iterator 属性
let obj = {
    a: 1,
    b: 2,
    c: 3
};
obj[Symbol.iterator] = function* () {
    for(let key in this) {
        yield obj[key]
    }
}
/*for(let val of obj) {
    console.log(val);
}*/

// 异步处理 (这个很有意思)
function time() {
    console.log(Date.now());
    setTimeout(() => {
        console.log(Date.now());
        it.next(123);
    }, 2000)
}

function *gen() {
    let res = yield time();
    console.log(res);
}
let it = gen();
it.next();


