const doSomethingAsync = () => {
	return new Promise(resolve => {
		setTimeout(() => resolve('做些事情'), 3000)
	})
}

const doSomething = async () => {
	console.log(1);
	console.log(await doSomethingAsync())
	console.log(2);
}

console.log('之前')
doSomething()
console.log('之后')
// 之前
// 1
// 之后
// 做些事情
// 2
