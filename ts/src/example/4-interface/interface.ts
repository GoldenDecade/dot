/*
interface NameInfo {
    firstName: string,
    lastName: string
}
const getFullName = ({firstName, lastName}: NameInfo, age: number): string => {
    return `${firstName} ${lastName}`;
}

getFullName({
    firstName: 'wang',
    lastName: 'qiang'
}, 20)

// 可选属性 & 只读属性
interface Vegetable {
    color?: string,
    readonly type: string
}

let vegetableInfo = {
    type: 'tomato',
    size: 2
}
let vegetableInfo1: Vegetable = {
    type: 'tomato',
    color: 'red',
    // size: 2 // 接口未定义 size, 所以报错
}
// vegetableInfo1.type = 'egg' // Type 定义的是只读的

// 多余属性检测, 如何绕过
// 1. as
// 2. [prop]
let vegetableInfo2: Vegetable = ({
    type: 'tomato',
    color: 'red',
    size: 2
} as Vegetable);

interface Vegetable1 {
    color?: string,
    readonly type: string,
    [props: string]: string,
}
let vegetableInfo3: Vegetable1 = {
    type: 'tomato',
    color: 'red',
    size: '2', // 接口未定义 size, 所以报错
    'sdfa': 'ds',
    'sd': '3',
    [Symbol('sd')]: 'sdf'
}
const getVegetable = ({color, type}: Vegetable1) => {
    return `A ${color ? color : ''} : ${type}`
}
getVegetable({color: 'red', type: 'banana', size: 'ds'})


// 索引类型
interface ArrInter {
    0: number,
    readonly 1: string
}
let arr11: ArrInter = [1, 'a'];

/!*interface AddFunc {
    (num1: number, num2: number): number
}*!/
// 类型别名
type AddFunc = (num1: number, num2: number)=> number;
const addFunc: AddFunc = (n1, n2) => n1 + n2;

// extends
interface V1 {
    color: string
}
interface Tomato extends V1{
    type: string
}
const to: Tomato = {
    type: 'to',
    color: 'red'
}

interface Counter {
    (): void,
    count: number
}
const getCounter = (): Counter => {
    const c = () => {c.count++}
    c.count = 0;
    return c;
}
const counter = getCounter()
counter();
counter();
counter();
console.log(counter.count);
*/
