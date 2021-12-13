const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
	constructor() {
		this.middlewares = []
	}
	listen(port, cb) {
		const server = http.createServer(async (req, res) => {
			const ctx = this.createContext(req, res)
			const fn = this.compose(this.middlewares)
			await fn(ctx)
			res.end(ctx.body)
		})
		server.listen(port, cb)
	}
	use(middleware) {
		this.middlewares.push(middleware)
	}
	createContext(req, res) {
		const ctx = Object.create(context)
		ctx.request = Object.create(request)
		ctx.response = Object.create(response)

		ctx.request = ctx.req = req
		ctx.response = ctx.res = res

		return ctx
	}
	compose(middlewares) {
		return function (ctx) {
			const dispatch = function (i) {
				const fn = middlewares[i]
				if (!fn) {
					return Promise.resolve()
				}
				return Promise.resolve(fn(ctx, function next() {
					return dispatch(i + 1)
				}))
			}
			return dispatch(0)
		}
	}
}

module.exports = Koa
