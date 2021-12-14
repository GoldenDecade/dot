class Router {
	constructor() {
		this.stack = []
	}
	get(path, middleware) {
		this.registerRoute('get', path, middleware)
	}
	post(path, middleware) {
		this.registerRoute('post', path, middleware)
	}
	registerRoute(method, path, middleware) {
		this.stack.push({
			method: method.toLocaleUpperCase(),
			path,
			middleware
		})
	}
	routes() {
		// 依次将 路由 添加到中间件中
		return async (ctx, next) => {
			let middleware
			for(let i = 0; i < this.stack.length; i++) {
				const item = this.stack[i]
				console.log(ctx.url)
				console.log(ctx.method);
				console.log(item.path);
				if (item.method === ctx.method && (ctx.url === item.path)) {
					middleware = item.middleware
					break
				}
			}
			if (middleware) {
				return middleware(ctx, next)
			}else {
				return await next()
			}
		}
	}
}
module.exports = Router
