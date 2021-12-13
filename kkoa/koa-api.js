const path = require('path')
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const serve = require('koa-static')
const router = new Router()

// logger
// app.use(async (ctx, next) => {
// 	await next()
// 	const rt = ctx.response.get('X-Response-Time')
// 	console.log(`${ctx.method} ${ctx.url} - ${rt}`)
// })
//
// // x-response-time
// app.use(async (ctx, next) => {
// 	const start = Date.now()
// 	await next()
// 	const ms = Date.now() - start
// 	ctx.set('X-Response-Time', `${ms}ms`)
// })
//
//
// app.use(async ctx => {
// 	ctx.body = 'hello world'
// })

// app.callback = function (){
// 	console.log('listen 之后的 callback 函数');
// }

router.get('/', (ctx) => {
	console.log('get /');
	ctx.type = 'html'
	ctx.body = '<h1>hello world!</h1><image src="/public/ico.png"></image>'
})
console.log(path.resolve(__dirname, './public'));
app.use(serve('./'))
// app.use(serve('./'))
app.use(router.routes())

app.listen(12101)

