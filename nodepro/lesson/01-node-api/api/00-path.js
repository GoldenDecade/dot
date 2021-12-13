const path = require('path')

console.log(path.resolve(__dirname, 'public'));
console.log(path.basename('./public'));
console.log(path.basename('../public'));
console.log(path.basename('./public/a.txt'));
console.log(path.resolve(__dirname, '/public/a.txt'));
console.log(path.resolve(__dirname, './public/a.txt'));
console.log(path.resolve(__dirname, '../public/a.txt'));
console.log(path.join(__dirname, './public/a.txt'));
console.log(path.join(__dirname, '../public/a.txt'));

