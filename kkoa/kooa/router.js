class Router {
	constructor() {
		this.stack = []
	}
	get(path, middleware) {
		this.register(path, 'get', middleware)
	}
	post(path, middleware) {
		this.register(path, 'post', middleware)
	}
	register(path, methods, middleware) {
		this.stack.push({
			path,
			methods,
			middleware
		})
	}
	routes() {
		// 作为中间件
		let stack = this.stack
		return async function (ctx, next) {
			const url = ctx.url
			console.log('url :', url);
			let route = null;
			for (let i = 0; i < stack.length; i++) {
				const item = stack[i]
				if (item.path === url && item.methods.includes(item.methods)) {

					route = item.middleware
					break
				}
			}
			if (typeof route === 'function') {
				return route(ctx, next)
			}
			await next()
		}
	}
}

module.exports = Router
