const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    ctx.body = 'Hello node'
})
app.listen(3000, () => {
    console.log('app started at http://localhost:3000/')
})
