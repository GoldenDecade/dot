const fs = require('fs')
fs.writeFileSync('./test.txt', '798')
console.log(123);

/*fs.appendFile('./test.txt', '99', err=> {
	if(err) {
		console.error(err)
		return
	}
})*/
