class _LazyMan {
    constructor(name) {
        this.tasks = [];
        const task = () => {
            console.log(`hi, my name is ${name}`);
            this.next();
        };
        this.tasks.push(task);
        // 这里使用setTimeout 延迟执行 next; 有宏任务的感觉
        setTimeout(() => {
            this.next();
        }, 0)
    }
    next() {
        let task = this.tasks.shift();
        task && task();
    }
    sleep(time) {
        this._sleepWrapper(time, false);
        return this;
    }
    firstSleep(time) {
        this._sleepWrapper(time, true);
        return this;
    }
    _sleepWrapper(time, isFirst) {
        let task = () => {
            setTimeout(() => {
                console.log(`wake up after ${time}`);
                this.next();
            }, time);
        };
        if(isFirst) {
            this.tasks.unshift(task);
        }else {
            this.tasks.push(task);
        }
        return this;
    }
    eat(food) {
        this.tasks.push(() =>  {
            console.log(`Eat ${food}`);
            this.next();
        });
        return this;
    }
}

let lazyman = new _LazyMan('Hank')
lazyman.sleep(1000).eat('dinner').firstSleep(2000)
