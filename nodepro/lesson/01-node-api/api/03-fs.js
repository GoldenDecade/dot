const fs = require('fs')
const util = require('util')
const stat = util.promisify(fs.stat)
// 同步
// const data = fs.readFileSync('./download.js')
// console.log(data,data.toString())

// 异步方式
// fs.readFile('./download.js',(err,data) => {
//     if(err) throw err
//     console.log(data)
// })

// console.log(fs.statSync(__dirname));
// console.log(fs.readdirSync(__dirname));


// fs.stat(__dirname, (err, data) => {
// 	console.log(data);
// })


stat(__dirname).then(data => {
	console.log(data);
})
