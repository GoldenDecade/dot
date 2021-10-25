const recast = require('recast')

const code = `
    const obj = {a: 1}
    function add(a, b) {
        return a + b + obj.a;
    }
`
const ast = recast.parse(code)
// console.log(JSON.stringify(ast));


const code1 = `var answer = 6 * 7;`
console.log(JSON.stringify(recast.parse(code1)));
