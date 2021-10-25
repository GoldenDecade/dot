const _3s1 = Symbol()
console.log(_3s1);

const _3s2 = Symbol('lison')
console.log(_3s2.toString(), _3s2.toString().length, Boolean(_3s2), !_3s2);

let _3prop1 = 'age'
const _3obj = {
    [_3prop1]: 'abc',
    [_3s1]: 'bbb',
    a: 123
}
// symbol作为 key 时, 不能被遍历到
// tslint:disable-next-line:forin
for (const key in _3obj) {
    // console.log(`%c key: ${key}`, 'color: red');
}

console.log(Object.keys(_3obj));
console.log(Object.getOwnPropertyNames(_3obj));
console.log(JSON.stringify(_3obj));
console.log(Object.getOwnPropertySymbols(_3obj));
console.log(Reflect.ownKeys(_3obj)); // ["age", "a", Symbol()]

const _3for1 = Symbol.for('lison')
const _3for2 = Symbol.for('lison')
console.log(Symbol.keyFor(_3for1)); // 'lison'
console.log(Symbol.keyFor(_3for2)); // 'lison'

// 自定义 instanceof
const obj1 = {
    [Symbol.hasInstance] (otherObj) {
        console.log(otherObj);
    }
}
console.log({a : 'a'} instanceof (obj1 as any));

// Symbol.isConcatSpreadable
// 内置的Symbol.isConcatSpreadable符号用于配置某对象作为Array.prototype.concat()方法的参数时是否展开其数组元素
let arr = [1, 2]
// console.log([].concat(arr)) // [1, 2]
arr[Symbol.isConcatSpreadable] = false
// console.log([].concat(arr)) // [ [1,2] ]  返回了一个二维数组


class C extends Array {
    constructor (...args) {
        super(...args)
    }
    getName1 () {
        return 'lison'
    }
}
const c = new C(1, 2, 3)
const a = c.map(item => item + 1)
// 解析如下:
/*
Array.prototype.map = function (callback) {
    var Species = this.constructor[Symbol.species];// 返回 Array
    var returnValue = new Species(this.length);
    this.forEach(function (item, index, array) {
        returnValue[index] = callback(item, index, array);
    });
    return returnValue;
}
*/

let _s3obj3 = {
    [Symbol.match] (str) {
        console.log(str);
        console.log(str.length);
    },
    [Symbol.split] (str) {
        console.log('split', str.length);
    }
}

console.log('abcde'.match(_s3obj3 as RegExp));
// 自定义这些方法
// Symbol.replace
// Symbol.search
// Symbol.split

let _s4obj4: unknown = {
    [Symbol.toPrimitive] (type) {
        console.log(type)
    }
}
