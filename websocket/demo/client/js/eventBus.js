// 发布/订阅模式 (Pub/Sub)
class EventBus {
    constructor() {
        this._eventList = {} // 调度中心列表
    }

    // static关键字: 静态方法,可以直接在EventBus类上调用,只能在静态方法中调用,不能在实例方法中调用
    static Instance() {
        if(!EventBus._instance) {
            Object.defineProperty(EventBus, '_instance', {
                value: new EventBus()
            })
        }
        return EventBus._instance
    }

    onEvent(type, fn) {
        if(this.isKeyInObj(this._eventList, type)) {
            this._eventList[type].push(fn)
        }else {
            this._eventList[type] = []
            Object.defineProperty(this._eventList, type, {
                value: [fn],
                writable: true,
                enumerable: true,
                configurable: true
            })
        }
    }
    offEvent(type, fn) {
        if(!this._eventList[type]) return;
        let index = this._eventList[type].findIndex(event => event === fn)
        ~index ? this._eventList[type].splice(index, 1) : ''
        if(!this._eventList[type].length) this._eventList.delete(type)
    }
    emitEvent(type, ...data) {
        if(!this._eventList[type]) return;
        for(let i = 0; i < this._eventList[type].length; i++) {
            this._eventList[type][i] && this._eventList[type][i](...data)
        }
    }
    isKeyInObj(obj, key) {
        return Object.hasOwnProperty(obj, key);
    }
}

export default EventBus.Instance()
