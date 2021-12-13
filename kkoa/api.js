const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

app.use((ctx, next) => {
	ctx.body = [
		{
			name: 'tom12'
		}
	]
	next()
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'json'
	}
})
app.use(router.routes())

app.listen(1209)
