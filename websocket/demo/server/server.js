const http = require('http')
const WebSocket = require('ws')
const port = 1024
const pathname1 = '/ws1/'
const pathname2 = '/ws2/'
const server = http.createServer()

class WebSocketServer extends WebSocket.Server {
    constructor() {
        super(...arguments);
        this.webSocketClient = {}; // 存放已连接的客户端
    }

    set ws(val) { // 代理当前的ws, 赋值时将其初始化
        this._ws = val;
        val.t = this;
        val.on('error', this.errorHandler)
        val.on('close', this.closeHandler)
        val.on('message', this.messageHandler)
    }
    get ws() {
        return this._ws
    }

    messageHandler(e) {
        console.log('messageHandler');
        console.log(e);
        let data = JSON.parse(e)
        console.log(data);
        switch (data.ModeCode) {
            case 'message':
                this.send(JSON.stringify(data))
                break;
            case 'heart_beat':
                console.log('send heart_beat');
                this.send(JSON.stringify(data))
                break;
        }
    }
    errorHandler(e) {
        this.t.removeClient(this)
    }
    closeHandler() {
        this.t.removeClient(this)
    }

    addClient(item) {
        if(this.webSocketClient[item['name']]) {
            this.webSocketClient[item['name']].close()
        }
        this.webSocketClient[item['name']] = item;
    }
    removeClient(item) {
        if(!this.webSocketClient[item['name']]) {
            return;
        }
        this.webSocketClient[item['name']] = null;
    }
}

const ws1 = new WebSocketServer({noServer: true})
const ws2 = new WebSocketServer({noServer: true})
server.on('upgrade', (req, socket, head) => {
    let url = new URL(req.url, `http://${req.headers.host}`)
    let name = url.searchParams.get('name')
    if(checkUrl(url.pathname, pathname1)) {
        ws1.handleUpgrade(req, socket, head, (ws) => {
            ws.name = name;
            ws1.ws = ws;
            ws1.addClient(ws);
        })
    }else if(checkUrl(url.pathname, pathname2)){
        ws1.handleUpgrade(req, socket, head, (ws) => {
            ws.name = name;
            ws2.ws = ws;
            ws2.addClient(ws);
        })
    }else {
        return socket.destroy()
    }
})
server.listen(port, () => {
    console.log(`ws at ${port}`);
})

function checkUrl(url, key) {
    return -~ url.indexOf(key);
}
