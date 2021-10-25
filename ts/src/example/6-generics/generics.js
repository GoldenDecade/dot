// 泛型
// 让 api 支持多种类型设计,又能进行类型检查
// T 代表固定的一种类型
var getArray = function (value, times) {
    if (times === void 0) { times = 5; }
    return new Array(times).fill(value);
};
var getArray1 = function (para1, para2, times) {
    return new Array(times).fill([para1, para2]);
};
var getArray3 = function (a, b, c) {
    return new Array(c).fill([a, b]);
};
var getArray5 = function (a, b, c) {
    return new Array(c).fill([a, b]);
};
var getArray6;
getArray6 = function (para1, para2, times) {
    return new Array(times).fill([para1, para2]);
};
var getArray7;
getArray7 = function (para1, para2, times) {
    return new Array(times).fill([para1, para2]);
};
console.log(getArray7(1, 2, 4));
