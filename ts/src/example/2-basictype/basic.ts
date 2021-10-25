let arr1: number[]
arr1 = [1,2,3];
let arr2: (number | string)[]
arr2 = [1,2]

let arr3: any[]

// 元组类型 必须完全对应
let tuple: [string, number, boolean]
tuple = ['a', 1 , false]

// 枚举类型, 可以自定义数字
enum Roles {
    SUPER_ADMIN,
    ADMIN = 3,
    USER
}

// any类型
let value: any = 123

// void类型 --> null | undefined
const consoleText = (text: string): void => {
    console.log(text);
}
let v: void;
v = null;
v = undefined;
// v = 123;//这样就报错

// never类型  返回never的函数必须存在无法达到的终点
const infiniteFunc = (): never => {
    while(true){
        console.log(1);
    }
}

// 类型断言
const getLength = (target: string | number): number => {
    if((target as string).length || (target as string).length === 0) {
        return (target as string).length;
    }else {
        return target.toString().length;
    }
}
getLength(234)
