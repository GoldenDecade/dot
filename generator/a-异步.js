// var fetch = require('node-fetch');

// import fetch from 'node-fetch'
//
// console.log(fetch);
//
// function* gen1(){
// 	var url = 'https://api.github.com/users/github';
// 	var result = yield fetch(url);
// 	console.log(6);
// 	console.log(result.bio);
// }
// var g1 = gen1();
// console.log(1);
// var result = g1.next();
// console.log(2);
// result.value.then(function(data){
// 	console.log(4);
// 	return data.json();
// }).then(function(data){
// 	console.log(5);
// 	g1.next(data);
// });
// console.log(3);


function* gen() {
	yield setTimeout(() => {
		console.log(3);
		console.log(g.next());
	}, 1000)
	console.log('gen code');
}
var g = gen()
console.log(1);
console.log(g.next());
console.log(2);
