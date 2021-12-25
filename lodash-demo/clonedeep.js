import _ from 'lodash'

console.log(_.cloneDeep(123));


console.log(('a&b').replace(/[^&]+/g, function (item) {
	console.log(item);
	return '-'
}));

console.log([1, 2, 1, 2, 3].find(item => item === 1));

let f1 = new Function('return ' + 123)
console.log(f1()); // 123

console.log(new RegExp('(^\\d+$)').test('234'));
console.log(/^\d{1,3}$/.test('123'));
