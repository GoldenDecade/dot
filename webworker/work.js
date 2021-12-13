self.addEventListener('message', function (e) {
	// console.log('self');
	// console.table(e)
	handler(e.data.type)
}, false);

function handler(type) {
	console.log(type);
	if (type === 'a') {
		for(let i = 0; i < 9999999999; i++) {

		}
		self.postMessage('a done')
	}else if (type === 'b') {
		self.postMessage('b done')
	}
}
