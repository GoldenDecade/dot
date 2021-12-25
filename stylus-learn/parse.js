// var stylus = require('stylus');
import fs from 'fs'
import stylus from 'stylus'

var str = fs.readFileSync('./index.styl')
console.log(str.toString());
// var str = '$font-size = 14px\n' +
// 	'$-input-default-font-size := $font-size'
stylus.render(str.toString(), function(err, css){
	console.log('err ', err);
	if (err) throw err;
	console.log(css);
});
