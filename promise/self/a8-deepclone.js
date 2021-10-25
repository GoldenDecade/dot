function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}
/*function deepClone(obj) {
    if(!isObject(obj)) {
        return obj;
    }
    let res = Array.isArray(obj) ? [] : {};
    Reflect.ownKeys(obj).forEach(item => {
        if(isObject(obj[item])) {
            res[item] = deepClone(obj[item]);
        }else {
            res[item] = obj[item]
        }
    })
    return res;
}*/
function deepClone(obj, hash = new WeakMap()) {
    if(!isObject(obj)) {
        return obj;
    }
    if(hash.has(obj)) {
        return hash.get(obj);
    }
    let res = Array.isArray(obj) ? [] : {};
    hash.set(obj, res);
    Reflect.ownKeys(obj).forEach(item => {
        console.log(item);
        if(isObject(obj[item])) {
            res[item] = deepClone(obj[item]);
        }else {
            res[item] = obj[item]
        }
    })
    return res;
}
var s1 = Symbol();
var s2 = Symbol();
var obj = {
    a: {
        a: 1,
        b: {
            c: 1
        }
    },
    b: 2
};
var handler = function(){};
obj[s1] = [1,2,3];
obj[s2] = [1,2,3];
obj[handler] = 2;
// var target = deepClone(obj);
// console.log(target[handler]);

var w1 = new WeakMap();
w1.set(handler, {});
var target1 = deepClone(obj, w1);
console.log(target1);
