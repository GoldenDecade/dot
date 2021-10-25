function flatten(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            res = res.concat(flatten(arr[i]));
        }else {
            res = res.concat(arr[i]);
        }
    }
    return res;
}

let arr = [[1, 2], [3, 4], 5, [6, [7,[8]]]];
console.log(flatten(arr));
// 使用 reduce
function flattenReduce(arr) {
    return arr.reduce((prev, cur) => {
        return Array.isArray(cur) ? [...prev, ...(flattenReduce(cur))] : [...prev, cur];
    }, [])
}

console.log(flattenReduce(arr));

// 使用 迭代的 思路;  iterable & while
function flattenWithIterable(arr) {
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr);
    }
    return arr;
}

console.log(flattenWithIterable(arr));
