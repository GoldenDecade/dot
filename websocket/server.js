const http = require('http');
const {parse} = require('url')
const WebSocket = require('ws');
const port = 1024//端口
const pathname = '/ws/'//访问路径
const pathname1 = '/ws1/'//访问路径
const server = http.createServer()
console.log(parse);

class WebSocketServer extends WebSocket.Server {
    constructor () {
        console.log('constructor');
        super(...arguments);
        this.webSocketClient = {}//存放已连接的客户端
    }

    set ws (val) {//代理当前的ws，赋值时将其初始化
        this._ws = val
        val.t = this;
        val.on('error', this.errorHandler)
        val.on('close', this.closeHandler)
        val.on('message', this.messageHandler)
    }

    get ws () {
        return this._ws
    }

    messageHandler (e) {
        console.info('接收客户端消息')
        let data = JSON.parse(e)
        switch(data.ModeCode) {
            case 'message':

                this.send(e)
                break;
            case 'heart_beat':

                this.send(e)
                break;
        }
    }

    errorHandler (e) {
        this.t.removeClient(this)
        console.info('客户端出错')
    }

    closeHandler (e) {
        this.t.removeClient(this)
        console.info('客户端已断开')
    }

    addClient (item) {//设备上线时添加到客户端列表
        if(this.webSocketClient[item['name']]) {
            this.webSocketClient[item['name']].close()
        }
        this.webSocketClient[item['name']] = item
    }

    removeClient (item) {//设备断线时从客户端列表删除
        if(!this.webSocketClient[item['name']]) {
            return;
        }
        this.webSocketClient[item['name']] = null
    }
}

const webSocketServer = new WebSocketServer({noServer: true})
const webSocketServer1 = new WebSocketServer({noServer: true})
server.on("upgrade", (req, socket, head) => {//通过http.server过滤数据
    console.log('req.url');
    console.log(req.url);
    let url = new URL(req.url, `http://${req.headers.host}`)
    console.log('url');
    console.log(url);
    let name = url.searchParams.get('name')//获取连接标识
    // 适配多个路径
    if(checkUrl(url.pathname, pathname)) {
        webSocketServer.handleUpgrade(req, socket, head, function (ws) {
            ws.name = name//添加索引，方便在客户端列表查询某个socket连接
            webSocketServer.addClient(ws);
            webSocketServer.ws = ws
        });
    }else if(checkUrl(url.pathname, pathname1)) {
        webSocketServer1.handleUpgrade(req, socket, head, function (ws) {
            ws.name = name//添加索引，方便在客户端列表查询某个socket连接
            webSocketServer1.addClient(ws);
            webSocketServer1.ws = ws
        });
    }else { //未按标准
        socket.write('未按照标准访问');
        socket.destroy();
        return;
    }
})
server.listen(port)

//验证url标准
function checkUrl (url, key) {//判断url是否包含key
    let res = - ~ url.indexOf(key);
    return res;
}
