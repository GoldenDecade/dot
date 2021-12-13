import fs from "fs";

function promisify(fn) {
	return (...args) => {
		return new Promise((resolve, reject) => {
			// 其实就是扩充参数--- 肯定是要保持原样
			args.push(function (err, data){
				if (err) {
					reject(err)
				}
				resolve(data)
			})
			fn.apply(null, args)
		})
	}
}

// 核心就是外面包一层 内部还是保持之前的

// const fs = require('fs')
// const util = require('util')


// ----同步
// fs.stat(__dirname, (err, data) => {
// 	console.log(data);
// })

// ----异步 for util.promisify
// const stat = util.promisify(fs.stat)

// ----异步 for promisify
const stat = promisify(fs.stat)

stat(__dirname).then(data => {
	console.log(data);
})
