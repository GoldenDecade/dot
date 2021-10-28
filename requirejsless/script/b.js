define(function (require, exports, module) {
	var c = require('./c')
	console.log('c in b.js:', c);
	return c;
})
