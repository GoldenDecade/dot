class Scheduler {
    constructor(limit) {
        this.runCounts = 0;
        this.maxRunCounts = limit;
        this.queue = [];
    }

    taskStart() {
        for(let i = 0; i < this.maxRunCounts; i++){
            this.request()
        }
    }
    request() {
        if(!this.queue || !this.queue.length || this.runCounts >= this.maxRunCounts) {
            return;
        }
        this.runCounts++
        this.queue.shift()().then(() => {
            this.runCounts--;
            this.taskStart();
        })
    }
    add(fn, time, ...rest) {
        let promiseCreator = function () {
            return new Promise(resolve => {
                setTimeout(() => {
                    fn(...rest);
                    resolve();
                }, time);
            })
        };
        this.queue.push(promiseCreator);
    }
}

const scheduler = new Scheduler(2);
let startTime = Date.now();
let handler1 = function(a, b){
    console.log(Date.now() - startTime);
    console.log('handler1 : ', a + b);
}
let handler2 = function(a, b){
    console.log(Date.now() - startTime);
    console.log('handler2 : ', a * b);
}
let handler3 = function(a, b){
    console.log(Date.now() - startTime);
    console.log('handler1 : ', a + b + 3);
}

scheduler.add(handler1, 200, 1, 2);// 200 3
scheduler.add(handler2, 1200, 2.5, 2);// 1200 5
scheduler.add(handler3, 300, 1, 0);// 500 4
scheduler.add(handler1, 200, 4, 2);// 700 6
scheduler.add(handler3, 200, 2, 2);// 900 7
scheduler.add(handler1, 500, 4, 10);// 1400 14
scheduler.add(handler1, 200, 1, 13);// 1400 14
scheduler.taskStart();
