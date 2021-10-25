import eventBus from "./eventBus.js";

const ModeCode = {
    MSG: 'message',
    HEART_BEAT: 'heart_beat'
}

// 重连机制:
/* 连接成功(open)之后,开始发送心跳,首先将state 置为 false, 接下来比如间隔是30s,如果30s后 state是 true,则继续发送心跳, 如果state是 false, 则要重连了, 判断 isReconnect & retryTimes, 等待 3s 后,客户端开始重连
* 在onmessage的回调函数中,如果收到心跳的响应将 state 置为 true,
* */

// 在原生WebSocket基础上 封装,进行隔离,这样降低耦合
export default class MyWebSocket extends WebSocket {
    constructor(url, protocols) {
        super(url, protocols);
        this.urlLink = url;
    }

    /*
    * 入口函数
    * @param heartBeatConfig time: 心跳时间间隔 timeout: 心跳超时间隔 reconnect: 断线重连时间间隔
    * @param isReconnect 是否支持断线重连
    * @param retryTimes 重连次数
    * */
    init(heartBeatConfig, isReconnect, retryTimes) {
        this.onopen = this.openHandler //连接上时回调函数
        this.onclose = this.closeHandler
        this.onerror = this.errorHandler
        this.onmessage = this.messageHandler
        this.heartBeat = heartBeatConfig
        this.isReconnect = isReconnect
        this.retryTimes = retryTimes
        this.reconnectTimer = null // 断线重连时间器
        this.webSocketState = false // socket状态, true为已连接
    }

    openHandler() {
        eventBus.emitEvent('changeBtnState', 'open', this.urlLink)
        this.webSocketState = true;
        // 开始发送心跳
        this.heartBeat && this.heartBeat.time ? this.startHeartBeat(this.heartBeat.time) : ''
    }
    messageHandler(e) {
        let data = this.getMsg(e)
        console.log('messageHandler');
        console.log(data);
        switch(data.ModeCode) {
            case ModeCode.MSG:
                console.log('收到消息: ' + data.msg);
                break;
            case ModeCode.HEART_BEAT: // 心跳
                console.log('ModeCode.HEART_BEAT :', ModeCode.HEART_BEAT);
                this.webSocketState = true;
                break;
        }
    }
    closeHandler() {
        eventBus.emitEvent('changeBtnState', 'close', this.urlLink)
        this.webSocketState = false;
    }
    errorHandler() {
        this.webSocketState = false;
        // 重连
        this.reconnectWebSocket()
    }

    startHeartBeat(timeout) {
        this.sendMsg({
            ModeCode: ModeCode.HEART_BEAT,
            msg: new Date()
        })
        this.webSocketState = false;
        setTimeout(() => {
            console.log('startHeartBeat this.webSocketState :', this.webSocketState);
            if(this.webSocketState) {
                return this.startHeartBeat(timeout)
            }
            try{
                console.log('close');
                this.close()
            }catch(e) {
                console.log('连接已关闭, 无需关闭');
            }
            this.reconnectWebSocket()
        }, timeout)
    }
    reconnectWebSocket() {
        if (!this.isReconnect) return;
        this.reconnectTimer = setTimeout(() => {
            eventBus.emitEvent('reconnect', this.urlLink)
        }, this.heartBeat.reconnectTimeout)
    }

    sendMsg(obj) {
        console.log('sendMsg');
        this.send(JSON.stringify(obj))
    }
    getMsg(e) {
        return JSON.parse(e.data)
    }
}
