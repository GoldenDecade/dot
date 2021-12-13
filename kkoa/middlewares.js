// 实现 中间件运行机制
// 洋葱圈模型

// 同步模式
const add = (x, y) => x + y
const square = (z) => z * z
const cube = z => z * z * z
function composeSync(middlewares) {
	// return (...arg) => {
	// 	console.log(arg);
	// 	args.reduce((prev, next) => {
	// 		console.log(prev);
	// 		return prev(...arg)
	// 	})
	// }
	// return middlewares.reduce((a, b) => {
	// 	console.log(a.name);
	// 	console.log(b.name);
	// 	return (...arg) => {
	// 		return a(() => b(...arg))
	// 	}
	// })(() => {});
	return middlewares.reduce((a, b) => {
		return (...args) => {
			return b(a(...args))
		}
	})
}
let fn = composeSync([add, square, cube])
console.log(fn(2, 3));
// console.log(fn);
// fn = compose(add, square) ---> fn(2, 3) --> 25
// function compose(fn1, fn2) {
// 	return (...args) => fn2(fn1(...args))
// }
// function composeSync(...[fn1, ...fns]){
// 	return (...args) => {
// 		let ret = fn1(...args)
// 		fns.forEach(fn => {
// 			ret = fn(ret)
// 		})
// 		return ret;
// 	}
// }
// const fnSync = composeSync(add, square)
// console.log(fnSync(2, 3));


// 异步模式

async function fn1(next){
	console.log('fn1')
	await next()
	console.log('end fn1')
}

async function fn2(next){
	console.log('fn2')
	await delay()
	await next()
	console.log('end fn2')
}

function fn3(next){
	console.log('fn3')
}

function delay(){
	console.log('delay');
	return new Promise((resolve) => {
		console.log('--resolve');
		setTimeout(() => {
			console.log('999');
			resolve(999)
		}, 2000)
	})
}

const middlewares = [fn1,fn2,fn3]
const fnAsync = composeAsync(middlewares)
// fnAsync()
function composeAsync(middlewares) {
	return function () {
		const dispatch = (index) => {
			const fn = middlewares[index]
			if (!fn) {
				return Promise.resolve()
			}else {
				return fn(function next(){
					return dispatch(index + 1)
				})
			}
		}
		return dispatch(0)
	}
}


