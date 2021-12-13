const Koa = require('./index.js')
const Router = require('./router')
const static = require('./static')
const fs = require("fs");
const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
	// ctx.body = '1'
	await next()
	// ctx.body += '5'
})
app.use(async (ctx, next) => {
	// ctx.body += '2'
	await next()
	// ctx.body += '4'
})
app.use((ctx, next) => {
	// ctx.body += '3'
	next()
})

router.get('/favicon.ico', (ctx) => {
	ctx.body = fs.readFileSync('./favicon.ico')
})

router.get('/index', ctx => {
	ctx.body = 'index page'
})

app.use(router.routes())
app.use(static('./public'))

app.listen(3001, () => {
	console.log('listen 3001');
})
