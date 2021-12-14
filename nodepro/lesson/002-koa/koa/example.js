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

router.get('/', ctx => {
	ctx.type = 'text/html; charset=UTF-8'
	// fs.createReadStream('./public/index.html').pipe(ctx.res)
	ctx.body = fs.readFileSync('./public/index.html')
})

router.get('/index', ctx => {
	ctx.body = 'index page'
})

router.get('/download', ctx => {
	ctx.res.setHeader('Content-Type', 'application/octet-stream')
	ctx.res.setHeader('Content-Disposition', 'attachment;filename=pub.zip')
	let f = fs.createReadStream('./pub.zip')
	f.pipe(ctx.res)
})
router.get('/zip', ctx => {
	// ctx.res.setHeader('Content-Type', 'application/octet-stream')
	// ctx.res.setHeader('Content-Disposition', 'attachment;filename=a.zip')
	// fs.createReadStream('./public/a.zip').pipe(ctx.res)
	ctx.body = fs.readFileSync('./public/a.zip')

})

app.use(router.routes())
app.use(static('./public'))

app.listen(3001, () => {
	console.log('listen 3001');
})

