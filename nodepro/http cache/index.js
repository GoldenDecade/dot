// http 缓存
// 强缓存  http1.0----Expires 设置过期时间  && http1.1----Cache-Control max-age设置多少秒过期
// 协商缓存
	// 设置了 no-cache 和 no-store 则本地缓存会被忽略, 会去请求服务器验证资源是否更新,如果没更新才继续使用本地缓存,此时返回304
	// http1.1 中的 last-modified & if-modified-since  &&  Etag && if-none-match
const http = require('http')
function updateTime() {
	this.timmer = this.timmer || setInterval(() => {this.time = new Date().toUTCString()}, 5000)
	return this.time;
}
http.createServer((req, res) => {
	let {url} = {...req}
	if(url === '/') {
		// 返回html
		res.writeHead(200)
		res.end(`
<html>
html update at ${updateTime()}
<script src="main.js"></script>
</html>
		`)
	}else if(url === '/main.js') {
		// 返回js内容
		const content = `
		document.writeln('<br/>js update at ${updateTime()}')
		`;
		// 强缓存
		// res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString()) // 设置过期时间
		// res.setHeader('Cache-Control', 'max-age=20')

		// 协商缓存
		res.setHeader('Cache-Control', 'no-cache')

			//last-modified && if-modified-since
		// res.setHeader('last-modified', new Date().toUTCString())
		// if(new Date(req.headers['if-modified-since']).getTime() + 5 * 1000 > Date.now()) {
		// 	res.statusCode = 304
		// 	res.end()
		// 	return;
		// }
			// Etag && if-none-match
		const crypto = require('crypto')
		const hash = crypto.createHash('sha1').update(content).digest('hex')
		res.setHeader('Etag', hash)
		if(new Date(req.headers['if-none-match']) === hash ) {
			res.statusCode = 304
			res.end()
			return;
		}
		res.statusCode = 200
		res.end(content)
	}else if(url === '/favicon.ico') {
		res.end('')
	}
}).listen(3000)
