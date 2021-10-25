// 合并类型 例如: T & U
// 联合类型
var valueList = [123, 'dsdf'];
var getRandomValue = function () {
    var num = Math.random() * 10;
    if (num < 5) {
        return valueList[0];
    }
    else {
        return valueList[1];
    }
};
var item = getRandomValue();
if (typeof item === 'string') {
    console.log(item.length);
}
else if (typeof item === 'number') {
    console.log(item.toFixed());
}
