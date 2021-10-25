class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(type, handler) {
        this.events[type] = Array.isArray(this.events[type]) ? this.events[type] : [];
        this.events[type].push(handler);
    }
    emit(type, ...rest) {
        if(!this.events[type] || this.events[type].length === 0) return ;
        this.events[type].forEach(handler => {
            handler.apply(this, rest)
        })
    }
    once(type, handler) {
        // 先执行一次  然后再解除
        let fn = (...args) => {
            console.log('fn exec');
            console.log(args);
            handler.apply(this, args);
            this.off(type, handler);
        }
        this.on(type, fn);
    }
    off(type, handler) {
        // 可以传 两个参数,也可以只传一个参数
        if (!this.events[type] || this.events[type].length === 0) return;
        if(handler) {
            let index = this.events[type].findIndex(callback => callback === handler);
            this.events[type].splice(index, 1);
        }else {
            this.events[type] = null;
        }
    }

}

var event1 = new EventEmitter();
event1.on('click', function () {
    // console.log(this === window);
    console.log('event1 click 1');
})
event1.on('click', function () {
    console.log('event1 click 2');
})
event1.on('click', function (a, b) {
    console.log('event1 click 3');
    console.log(a * b);
});
let onceLickHandler = function (a, b) {
    console.log('once');
    console.log(this);
    // console.log(this === window);
    console.log(a + b);
};
event1.once('click', onceLickHandler)

event1.emit('click', 1, 2);
event1.emit('click', 1, 2);

