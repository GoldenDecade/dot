const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}

class Deffer {
    constructor(cb) {
        this.status = STATUS.PENDING;
        this.value = undefined;

        // 收集当前对象then处理函数
        this.resolveQueue = [];
        this.rejectQueue = [];
        let called;
        const resolve = (value) => {
            console.log('resolve-----');
            if (called) return;
            called = true;
            console.log('real resolve');
            setTimeout(() => {
                this.value = value;
                this.status = STATUS.FULFILLED;
                for (let fn of this.resolveQueue) {
                    fn(this.value);
                }
            })
        }

        const reject = (value) => {
            console.log('reject---');
            if (called) return;
            called = true;
            console.log('real reject');
            setTimeout(() => {
                this.value = value;
                this.status = STATUS.REJECTED;
                for (let fn of this.rejectQueue) {
                    fn(this.value);
                }
            })
        }

        try {
            cb(resolve, reject);
        } catch (reason) {
            reject(reason);
        }
    }

    then(onResolve, onReject) {
        // 值穿透
        onResolve = onResolve ? onResolve : (val) => {
            return val
        };
        onReject = onReject ? onReject : (val) => {
            return val
        };
        // 判断当前status
        if (this.status === STATUS.PENDING) {
            const resolveQueue = this.resolveQueue;
            const rejectQueue = this.rejectQueue;

            const promise = new Deffer((resolve, reject) => {
                resolveQueue.push((innerValue) => {
                    try {
                        let value = onResolve(innerValue);
                        doThenFunc(promise, value, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                })
                rejectQueue.push((innerValue) => {
                    try {
                        let value = onReject(innerValue);
                        doThenFunc(promise, value, resolve, reject);
                    } catch (reason) {
                        reject(reason);
                    }
                })
            })
            return promise;
        } else {
            const status = this.status;
            const innerValue = this.value;
            const promise = new Deffer((resolve, reject) => {
                try {
                    let value = status === STATUS.FULFILLED ? onResolve(innerValue) : onReject(innerValue);
                    doThenFunc(promise, value, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            })
            return promise;
        }
    }

    catch(onReject) {
        return this.then(null, onReject);
    }

    static resolve(value) {
        return new Deffer((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(value) {
        return new Deffer((resolve, reject) => {
            reject(value);
        })
    }

    static all(promises) {
        console.log('all');
        if (!Array.isArray(promises)) {
            return Deffer.reject(new TypeError('args must be an array'))
        }
        let remaining = promises.length;
        let result = [];
        let promise = new Deffer((resolve, reject) => {
            setTimeout(() => {
                console.log('setTimeout');
                for (let i = 0; i < promises.length; i++) {
                    doThenFunc(promise, promises[i], (value) => {
                        result.push(value);
                        if (!--remaining) {
                            resolve(result);
                        }
                    }, reject)
                }
            })
        })
        return promise;
    }

    static race(promises) {
        if (!Array.isArray(promises)) {
            return Deffer.reject(new TypeError('args must be an array'))
        }
        let remaining = promises.length;
        let result = [];
        let promise = new Deffer((resolve, reject) => {
            setTimeout(() => {
                console.log('setTimeout');
                for (let i = 0; i < promises.length; i++) {
                    doThenFunc(promise, promises[i], resolve, reject)
                }
            })
        })
        return promise;
    }
}


function doThenFunc(promise, value, resolve, reject) {
    if (value === promise) {
        return reject(
            new TypeError('Chaining cycle detected for promise')
        )
    }
    if (value instanceof Deffer) {
        return value.then((value) => {
            doThenFunc(promise, value, resolve, reject);
        }, (value) => {
            reject(value);
        })
    }
    resolve(value);
}


/*Deffer.all([1,2,3]).then(res => {
    console.log(res);
})*/
Deffer.race([1, 2, 3]).then(res => {
    console.log(res);
})
Deffer.race([Deffer.reject(1)]).then(res => {
    console.log(res);
}, res => {
    console.log('reject--------------');
    console.log(res);
    throw new Error('error---')
}).catch(error => {
    console.log('error');
    console.log(error);
})
/*

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
    return res;
}, (data) => {
    let res = data + 2;
    console.log(res);
    return res;
}).then(res => {

}, res => {
    throw new Error('synax error')
}).catch((error) => {
    console.log('error : ', error);
})*/
