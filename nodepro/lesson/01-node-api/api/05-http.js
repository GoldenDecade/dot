const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
    // response.end('hello ...')
    const { url, method ,headers} = request
	console.log(url);
	if (url === '/' && method === 'GET'){
        // 静态页面服务
        fs.readFile('index.html',(err,data) => {
			if (err) {
				console.log('readFile err');
				console.log(err);
			}
            response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)
        })
    }else if(url === '/users' && method === 'GET'){
        // Ajax服务
        response.writeHead(200,{
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify({
            name : 'laowang'
        }))
    }else if(~url.indexOf('favicon.ico')){
		// fs.createReadStream('./'+url).pipe(response)
		response.writeHead(200)
		response.end()
	}else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
		// 两种方式:
	    // 一种通过流的方式,减轻服务器压力
	    // 一种读取文件之后,再返回, 会产生阻塞  (大量并发时候, 处理不过来)
        // 图片文件服务
        fs.createReadStream('./'+url).pipe(response)

	    // 读取文件  然后返回
	    // response.setHeader('Content-Type', 'image/png')
	    // let content = fs.readFileSync('./' + url, 'binary')
	    // response.writeHead(200, 'OK')
	    // response.write(content, 'binary')
	    // response.end()
    }

})
server.listen(3000)
