// 视频 文件 名字太长了, 看起来不方便
// 将某个文件夹下的文件 重命名
// ~/Documents/ksc/lesson/Vue3.0全家桶 商场实战
import {readdir, stat, rename} from 'fs/promises'
import {promisify} from 'util'
import path from 'path'

const resolve = path.resolve
const targetDir = '/Users/wangqiang/Documents/ksc/lesson/Vue2.x小米商场'
const prefix = '【樱花论坛 www.sakuraaaa.com】'
// console.log(path.dirname(targetDir));
// console.log(path.parse(targetDir));
// console.log(path.basename(targetDir));
// console.log(path.normalize(targetDir));
// console.log(path.isAbsolute(targetDir));
// console.log(path.delimiter);
// console.log(path.posix);
replaceFileName(targetDir, prefix)
function replaceFileName(pathName, prefix = '', customPath) {
	// 读取当前文件夹 下的所有内容
	stat(pathName).then(stats => {
		if(stats.isDirectory()) {
			readdir(pathName).then(res => {
				// 将 res 循环遍历  读取其中的文件 或文件夹
				// 如果文件名字 包含【樱花论坛 www.sakuraaaa.com】, 则rename 掉
				res.forEach(item => {
					const itemName = resolve(pathName, item)
					stat(itemName).then(stats => {
						replaceFileName(itemName, prefix, customPath)
					}).catch(err => {
						console.log(err);
					})
				})
			}).catch(err => {
				console.log(err);
			})
		}else {
			// 文件就直接 rename
			const targetName = path.resolve(customPath || path.dirname(pathName), path.basename(pathName).replace(prefix, ''))
			rename(pathName, targetName).then(res => {
				console.log('rename success')
			}).catch(err => {
				console.log(err)
			})
		}
	})
}


