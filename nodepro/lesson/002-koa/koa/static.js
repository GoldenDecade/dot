const fs = require('fs')
const path = require('path')
module.exports = function (dirname) {
	const staticPath = path.resolve(__dirname, dirname)
	const staticFlag = '/' + path.basename(staticPath)
	return async function (ctx, next) {
		console.log('ctx.url');
		console.log(ctx.url);
		console.log(staticFlag);
		if (ctx.url.indexOf(staticFlag) === 0) {
			try {
				let targetPath = path.join(staticPath, ctx.url.replace(staticFlag, ''))
				console.log('targetPath');
				console.log(targetPath);
				const stat = fs.statSync(targetPath)
				if (stat.isDirectory()) {
					let res = '<head><meta charset="utf-8" /></head>'
					res += '<body><div style="padding: 20px">'
					const files = fs.readdirSync(targetPath)
					files.forEach(file => {
						let filePath = path.resolve(staticPath, file)
						if (fs.statSync(filePath).isDirectory()) {
							res += `<p><a href="${staticFlag + '/' + file}">${file}</a></p>`
						}else {
							res += `<p><a href="${staticFlag + '/' + file}">${file}</a></p>`
						}
					})
					res += '</div></body>'
					ctx.type = 'text/html; charset=UTF-8'
					ctx.body = res
				}else {
					console.log('ctx body');
					console.log('%c', ctx.url, 'color: red');
					console.log(fs.readFileSync(targetPath));
					ctx.type = 'image/*'
					fs.createReadStream(targetPath).pipe(ctx.response)
					// ctx.body = fs.readFileSync(targetPath)
					// ctx.response = fs.createReadStream(targetPath)
					// ctx.body = fs.createReadStream(targetPath)
				}
			}catch(e) {
				ctx.body = '404 not found'
			}
		}else {
			await next()
			return
		}

	}
}
