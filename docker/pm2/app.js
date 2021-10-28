const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    ctx.body = 'Hello pm2'
})
app.listen(3001, () => {
    console.log('app started at http://localhost:3001/')
})
