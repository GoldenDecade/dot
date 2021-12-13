const fs = require('fs')
const path = require('path')

function static(dir = './public') {
	// 也要用到中间件
	const basename = path.basename(dir)
	const staticDir = path.resolve(__dirname, dir)
	const staticPathFlag = '/' + basename
	console.log('basename :' , basename);
	return function (ctx, next) {
		const url = ctx.url;
		const targetPath = staticDir + url.replace(staticPathFlag, '')
		console.log('targetPath : ', targetPath);
		if (url.indexOf(staticPathFlag) === 0) {
			try {
				const stat = fs.statSync(targetPath)
				console.log(stat.isDirectory());
				// 是目录就展示出目录信息 返回 html
				if (stat.isDirectory()) {
					const dir = fs.readdirSync(targetPath)
					const res = ['<head><meta charset="utf-8" /></head><body><div style="padding-left: 20px">']
					dir.forEach(fileName => {
						if (fileName.includes('.')) {
							res.push(`目录: <a href="${staticPathFlag}/${fileName}">${fileName}</a></br>`)
						}else {
							res.push(`文件: <a href="${staticPathFlag}/${fileName}">${fileName}</a></br>`)
						}
					})
					res.push('</div></body>')
					ctx.body = res.join('');
				}else {
					// 不是目录返回文件信息
					ctx.body = fs.readFileSync(targetPath)
				}
			}catch(e){
				console.log(e);
			}
		}else {
			next()
		}
	}
}
module.exports = static


