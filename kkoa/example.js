const Koa = require('koa')
const app = new Koa()
app.listen(9001)
const mid1 = (ctx, next) => {
	console.log(1)
	ctx.body ='1'
	next()
	console.log(2)
}
const mid2 = (ctx, next) => {
	console.log(3)
	ctx.body +='3'
	next()
	console.log(4)
}
const mid3 = (ctx, next) => {
	console.log(5)
	next()
	console.log(6)
}
app.use(mid1)
app.use(mid2)
app.use(mid3)
