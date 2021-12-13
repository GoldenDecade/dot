const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')


class Koa {
	constructor() {
		this.ctx = null
		this.middlewares = []
	}
	use(fn) {
		this.middlewares.push(fn)
	}
	createContext(req, res) {
		this.ctx = Object.create(context)
		this.ctx.response = Object.create(response)
		this.ctx.request = Object.create(request)

		this.ctx.req = this.ctx.request = req
		this.ctx.res = this.ctx.response = res
		return this.ctx
	}
	handleMiddlewares(ctx) {
		let middlewares = this.middlewares
		// 洋葱圈模型
		return () => {
			function dispatch(i) {
				const fn = middlewares[i]
				if(fn) {
					return Promise.resolve(fn(ctx, function next(){
						return dispatch(i + 1)
					}))
				}else {
					return Promise.resolve()
				}
			}
			return dispatch(0)
		}
	}
	listen(port, callback) {
		const server = http.createServer( async (req, res) => {
			this.ctx = this.createContext(req, res)
			// 中间件处理
			const fn = this.handleMiddlewares(this.ctx)
			await fn()
			console.log('this.ctx.body');
			console.log(this.ctx.body);
			// 适应 图片 用 流 的形式返回 ***
			if (!this.ctx.response.type || this.ctx.response.type.indexOf('image/*') === -1) {
				res.end(this.ctx.body)
			}
		})
		server.listen(port, () => {
			callback()
		})
	}

}
module.exports = Koa
