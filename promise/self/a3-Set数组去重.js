var arr = [1,3,3,5,7,5,7,8]
var res = [...(new Set(arr))]
console.log(res); // [1,2,5,7,8]
