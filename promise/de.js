const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}

class Deffer {
    constructor(cb) {
        this.status = STATUS.PENDING;
        this.value = undefined;

        this.resolveQueue = [];
        this.rejectQueue = [];
        let called = false;
        const resolve = (value) => {
            if (called) return;
            called = true;
            this.value = value;
            setTimeout(() => {
                for(let i = 0; i < this.resolveQueue.length; i++) {
                    let fn = this.resolveQueue[i];
                    fn(this.value);
                }
            })
        }
        const reject = (value) => {
            if (called) return;
            called = true;
            this.value = value;
            setTimeout(() => {
                for(let i = 0; i < this.rejectQueue.length; i++) {
                    let fn = this.rejectQueue[i];
                    fn(this.value);
                }
            })
        }
        try{
            cb(resolve, reject);
        }catch(reason) {
            reject(reason);
        }
    }
    then(onResolve, onReject) {
        onResolve = isFunction(onResolve) ? onResolve : (value) => value;
        onReject = isFunction(onReject) ? onReject : (value) => value;
        let resolveQueue = this.resolveQueue;
        let rejectQueue = this.rejectQueue;

        let promise =  new Deffer((resolve, reject) => {
            resolveQueue.push((value) => {
                try{
                    let val = onResolve(value);
                    doThenFunc(promise, val, resolve, reject);
                }catch(reason) {
                    reject(reason);
                }
            })
            rejectQueue.push((value) => {
                try{
                    let val = onReject(value);
                    doThenFunc(promise, val, resolve, reject);
                }catch(reason) {
                    reject(reason);
                }
            })
        })
        return promise;
    }
    catch(onReject) {
        return this.then(null, onReject);
    }
    static resolve(val) {
        return new Deffer((resolve, reject)=> {
            resolve(val);
        })
    }
    static reject(val) {
        return new Deffer((resolve, reject)=> {
            reject(val);
        })
    }
    static all(promises) {
        if(!Array.isArray(promises)) {
            return Deffer.reject('must array');
        }
        let remaining = promises.length;
        let result = [];
        let promise = new Deffer((resolve, reject) => {
            setTimeout(() => {
                for(let i = 0; i< promises.length; i++) {
                    result.push(promises[i]);
                    if(!remaining--) {
                        doThenFunc(promise, result, resolve, reject);
                    }
                }
            })
        })
        return promise;
    }
    static race(promises) {
        if(!Array.isArray(promises)) {
            return Deffer.reject('must array');
        }
        let promise = new Deffer((resolve, reject) => {
            setTimeout(() => {
                for(let i = 0; i< promises.length; i++) {
                    try{
                        doThenFunc(promise, promises[i], resolve, reject);
                    }catch(reason) {
                        reject(reason);
                    }
                }
            })
        })
        return promise;
    }
}

function isFunction(fn) {
    return typeof fn === 'function';
}

function doThenFunc(promise, value, resolve, reject) {
    // value 和promise一致
    if(value === promise) {
        return reject(
            new TypeError('Chaining cycle detected for promise')
        )
    }
    // value 是一个promise对象
    if(value instanceof Deffer) {
        let deffer = value.then(res => {
            doThenFunc(deffer, res, resolve, reject);
        }, res => {
            reject(res);
        })
        return deffer;
    }

    resolve(value);
}


let deffer = new Deffer(function (resolve, reject) {
    reject(2)
})

deffer.then((data) => {
    let res = data + 1;
    console.log(res);
    return Deffer.resolve(res);
}, (data) => {
    let res = data + 10;
    console.log(res);
    return Deffer.reject(res);
}).then().then((data) => {
    let res = data + 1;
    console.log(res);
    return Deffer.reject(res);
}, (data) => {
    let res = data + 2;
    console.log(res);
    return res;
}).then(res => {

}, res => {
    throw new Error('synax error')
}).catch((error) => {
    console.log('error : ', error);
})