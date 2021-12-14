const Koa = require('koa')
const fs = require('fs');
const path = require('path')
const app = new Koa()
// app.use((ctx, next) => {
//     ctx.body = [
//         {
//             name: 'tom'
//         }
//     ]
//     next()
// })

// const router = {}
// router['/html'] = ctx => {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
// }


// app.use((ctx, next) => {
//     // ctx.body && ctx.body.push(
//     //     {
//     //         name:'jerry'
//     //     }
//     // )
//     console.log('url' + ctx.url)
//     router[ctx.url](ctx)
// })
// app.use(async (ctx,next) => {
//     const start = new Date().getTime()
//     console.log(`start: ${ctx.url}`);
//     await next();
//     const end = new Date().getTime()
//     console.log(`请求${ctx.url}, 耗时${parseInt(end-start)}ms`)
// })

app.use(require('koa-static')(__dirname + '/public'))
const router = require('koa-router')()
router.get('/string',async (ctx,next) => {
    ctx.body = 'koa2 string'
})
router.get('/json',async (ctx,next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})
router.get('/',async (ctx,next) => {
	ctx.type="html"
	const pathUrl = path.join(__dirname, '/index.html');
	ctx.body = fs.createReadStream(pathUrl)
})
router.get('/download',async (ctx,next) => {
	ctx.set({
		'Content-Type': 'application/octet-stream',
		'Content-Disposition': 'attachment;filename=pub.zip'
	})
	ctx.body = fs.createReadStream('./pub.zip')

})

app.use(router.routes())


app.listen(3009, () => {
	console.log('port 3009');
})
