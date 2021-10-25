let add: (x: number, y: number) => number
add = (arg1: number, arg2: number): number => arg1 + arg2

type Add = (x: number, y: number) => number
const add1: Add = (a, b) => a + b;
add1(1, 2)

type AddF = (x: number, y: number, z?: number) => number
const add2: AddF = (a, b, c) =>  a + b + c

// rest ...
function rest1(arg1: string, ...args: number[]): number[] {
    console.log(args.length);
    return [1];
}

console.log(rest1('1', 2, 3, 4));

// 重载; 根据传入的参数类型或者数量,判定返回值的类型
// 函数重载 只能通过函数来定义
function handleData(x: string): string[]
function handleData(x: number): number[]

function handleData(x: any): any {
    if(typeof x === 'string') {
        return x.split('');
    }else if(typeof x === 'number') {
        return [x];
    }
}
handleData('a')
handleData(2)



