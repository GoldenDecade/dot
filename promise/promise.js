/*console.log(1);
Promise.resolve(2).then(res => {
    console.log(res);
    return res;
}).then(res => {
    console.log(res);
    return res;
}).then(res => {
    console.log(res);
    return res;
}).then().then((res) => {
    console.log('值穿透: 之前then里面没有自定义函数');
    console.log(res);
})*/
/*
Promise.reject(5).then(res => {
    res = res + 1;
    console.log(res);
    return res;
}, res => {
    res = res + 2;
    console.log(res);
    return res;
}).then(res => {
    console.log(res);
}).then(res => {
    console.log('--res');
    console.log(res);
}).catch(function (err) {
    console.log(err);
})*/
/*setTimeout(() => {
    console.log('waiting');
});
new Promise(res => {
    console.log('new');
})
console.log(1.1);*/

/*
let p = Promise.resolve(5)
setTimeout(() => {
    p.then(res => {
        console.log(res);
        return res;
    }).then(res => {
        console.log(res);
        return res;
    })
}, 1000)
*/

new Promise(function (resolve, reject) {
    reject(23)
}).then(data => {
    console.log('fulfill');
}, data => {
    console.log(data);
    console.log('reject');
    return data;
}).then(data => {
    console.log('fulfill :', data);
},data => {
    console.log('reject :', data);
}).catch(err => {
    console.log(err);
})
