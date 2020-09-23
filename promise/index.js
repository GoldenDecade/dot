const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
};

class Deferred {
    constructor(callback) {
        this.value = undefined;
        this.status = STATUS.PENDING;

        // 储存回调
        this.resolveQueue = [];
        this.rejectQueue = [];

        let called; // 用于判断状态是否被修改
        const resolve = (value) => {
            if (called) return;
            called = true;

            // 模拟异步 （微任务）
            setTimeout(() => {
                this.value = value;
                this.status = STATUS.FULFILLED;
                // 调用回调
                for (let fn of this.resolveQueue) {
                    fn(this.value)
                }
            }, 200)
        };
        const reject = (reason) => {
            if (called) return;
            called = true;
            setTimeout(() => {
                this.value = reason;
                this.status = STATUS.REJECTED;
                for (let fn of this.rejectQueue) {
                    fn(this.value)
                }
            })
        };
        try {
            callback(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    static resolve(value) {
        return new Deferred((resolve, reject) => {
            resolve(value);
        })
    }

    static reject() {
        return new Deferred((resolve, reject) => {
            reject(value);
        })
    }

    then(onResolve, onReject) {
        console.log('then : ' + Date.now());
        // 解决值穿透
        onResolve = isFunction(onResolve) ? onResolve : (value) => {
            return value;
        };
        onReject = isFunction(onReject) ? onReject : (reason) => {
            console.log('iii');
            throw reason;
        };

        // 返回的是一个 Deferred对象
        if (this.status === STATUS.PENDING) {
            console.log('STATUS.PENDING');
            const rejectQueue = this.rejectQueue;
            const resolveQueue = this.resolveQueue;
            const promise = new Deferred((resolve, reject) => {
                resolveQueue.push(function (innerValue) {
                    try {
                        const value = onResolve(innerValue);
                        doThenFunc(promise, value, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
                rejectQueue.push(function (innerValue) {
                    try {
                        const value = onReject(innerValue);
                        doThenFunc(promise, value, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            return promise;
        } else {
            console.log('else');
            const innerValue = this.value;
            const isFulfilled = this.status === STATUS.FULFILLED;
            let promised;
            promised = new Deferred((resolve, reject) => {
                try {
                    const value = isFulfilled ? onResolve(innerValue) : onReject(innerValue);
                    doThenFunc(promised, value, resolve, reject);
                } catch (error) {
                    console.log('catch---');
                    console.log(error);
                    reject(error)
                }
            })
            return promised;
        }
    }

    catch(onReject) {
        return this.then(null, onReject)
    }
}

// 对then的接收值进行判断
// 值穿透  循环引用
function isFunction(fn) {
    return typeof fn === 'function';
}

function doThenFunc(promise, value, resolve, reject) {
    // 解决循环引用
    if (value === promise) {
        return reject(
            new TypeError('Chaining cycle detected for promise')
        );
    }
    if (value instanceof Deferred) {
        return value.then(
            function (val) {
                doThenFunc(promise, val, resolve, reject)
            },
            function (reason) {
                reject(reason);

            }
        );
    }
    resolve(value);
}

let defer = Deferred.resolve(5)
    setTimeout(() => {
        defer.then(res => {
            console.log(res);
            return res;
        })
            .then(res => {
                console.log(res);
                throw new Error('error---');
            }).catch(reason => {
            console.log('error');
        })
    }, 3000)


/*
new Deferred((resolve, reject) => {
    console.log(Date.now());
    setTimeout(() => {
        resolve(1)
    }, 2000)
})
    .then(
    res => {
        console.log(Date.now());
        let result = res * 1;
        console.log(result);
        return result;
    },
    res => {
        console.log(Date.now());
        let result = res * 2;
        console.log(result);
        return result;
    }
).then(
    res => {
        console.log(Date.now());
        let result = res * 1;
        console.log(result);
        return result;
    },
    res => {
        console.log(Date.now());
        let result = res * 2;
        console.log(result);
        return result;
    }
).then(
    res => {
        console.log(Date.now());
        let result = res * 1;
        console.log(result);
        return Promise.reject(res + 3);
    },
    res => {
        console.log(Date.now());
        let result = res * 2;
        console.log(result);
        return result;
    }
).then(
    res => {
        console.log(Date.now());
        let result = res * 1;
        console.log(result);
        return Promise.reject(res + 3);
    },
    res => {
        console.log(Date.now());
        let result = res * 2;
        console.log(result);
        return result;
    }
).catch(error => {
    console.log(`error: ${error}`)
})*/
