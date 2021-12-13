/*
function* f(x) {
    let y =  x * (yield );
    return y;
}
let a = f(6);
console.log(a.next());
console.log(a.next(2));
console.log(a.next(2));
*/

/*

var x = 1;
function *foo() {
    x++;
    yield; // 暂停！
    console.log( "x:", x );
}
function bar() {
    x++;
}
// 构造一个迭代器it来控制这个生成器
var it = foo();
// 这里启动foo()！
console.log(it.next()); // { value: undefined, done: false }
console.log(x); // 2
bar();
console.log(x); // 3
console.log(it.next()); // { value: undefined, done: true }
console.log(it.next()); // { value: undefined, done: true }*/

/*
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
let it = circle(); // 1
console.log(it.next()); // {value: 0, done: false}
console.log(it.next(9)); // z: 0 x: 9; 2 {value: 0, done: false }
console.log(it.next(8)); // z: 0 x: 8  3 {value: 0, done: false}
console.log(it.next(7)); // z: 0 x: 7 4
console.log(it.next(6));
console.log(it.next(5));
*/


/*

function *foo() {
    var x = yield 2;
    console.log('x1 : ', x);
    z++;
    var y = yield (x * z);
    console.log('x2 : ', x);
    console.log('y : ', y);
    console.log( x, y, z );
}
var z = 1;

// var it1 = foo();
// var it2 = foo();
// var val1 = it1.next().value; // 2 <-- yield 2
// var val2 = it2.next().value; // 2 <-- yield 2
// val1 = it1.next( val2 * 10 ).value; // 40 <-- x:20, z:2
// val2 = it2.next( val1 * 5 ).value; // 600 <-- x:200, z:3
// it1.next( val2 / 2 ); // 20 300 3
// it2.next( val1 / 4 ); // 200 10 3

var it = foo();
console.log(it.next());
console.log(it.next(10));
console.log(it.next(50));*/

/*function a() {
    setTimeout(() => {
        console.log(Date.now());
        // it.next(10);
        it.throw('error')
    }, 3000)
}

function* f() {
    try{
        var res = yield a();
        // 这里可以直接获取到异步的结果  进行处理
        console.log(res);
    }catch(err) {
        console.log('err : ', err);
    }

}
var it = f();
console.log(Date.now());
console.log(it.next());*/
