// 泛型
// 让 api 支持多种类型设计,又能进行类型检查

// T 代表固定的一种类型
const getArray = <T>(value: T, times: number = 5): T[] => {
    return new Array(times).fill(value);
}

const getArray1 = <T, U>(para1: T, para2: U, times: number): [T, U][] => {
    return new Array(times).fill([para1, para2]);
};

type GetArray<T, U> = (arg1: T, arg2: U, times: number)=> [T, U][]


const getArray3: GetArray<string, number> = (a, b, c) => {
    return new Array(c).fill([a, b]);
}
const getArray5: GetArray<string, number> =  (a, b, c): any[]=> {
    return new Array(c).fill([a, b]);
}

let getArray6: <T, U>(para1: T, para2: U, times: number)=> [T, U][]
getArray6 = (para1, para2, times) => {
    return new Array(times).fill([para1, para2]);
}

// 泛型继承, 对 T 进行特殊要求
interface ValueWithLength {
    length: number
}
let getArray7: <T, U>(para1: T, para2: U, times: number)=> [T, U][]
getArray7 = <T extends ValueWithLength>(para1, para2, times) => {
    return new Array(times).fill([para1, para2]);
}
console.log(getArray7(1, 2, 4));


