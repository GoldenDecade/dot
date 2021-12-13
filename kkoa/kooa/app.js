const fs = require('fs')
const Koa = require('./index')
const app = new Koa()
const serve = require('./static')
const Router = require('./router')
const router = new Router()

app.use(async (ctx, next) => {
	console.log(1)
	await next()
	console.log(5);
})
app.use(async (ctx, next) => {
	console.log(2)
	const delayVal = await delay()
	await next()
	console.log(4);
})
app.use((ctx, next) => {
	console.log(3)
	next()
})

function delay() {
	return new Promise((resolve, reject) => {setTimeout(() => {resolve(2)}, 1000)})
}

router.get('/abc', (ctx) => {
	console.log(123123);
	debugger
	ctx.type = 'text/plain; charset=utf-8'
	ctx.body = '王迷迷'
})
router.get('/favicon.ico', (ctx) => {
	ctx.body = fs.readFileSync('./favicon.ico')
})

app.use(router.routes())
app.use(serve('../public'))
app.listen(12103, () => {
	console.log('port 12103');
})
