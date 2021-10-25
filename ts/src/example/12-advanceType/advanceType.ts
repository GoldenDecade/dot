// 合并类型 例如: T & U

// 联合类型

const valueList = [123, 'dsdf']
const getRandomValue = () => {
    const num = Math.random() * 10
    if (num < 5) { return valueList[0] }
    else { return valueList[1] }
}
const item = getRandomValue()
if(typeof item === 'string') {
    console.log(item.length);
}else if(typeof item === 'number') {
    console.log(item.toFixed());
}