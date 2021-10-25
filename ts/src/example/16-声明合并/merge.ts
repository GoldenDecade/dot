// Interface Enum Function Namespace Class  Variable  & (Type alias 类型别名)
// 声明合并规则:
// 1. interface 同名的会合并
// 2. interface中的 Function, 会进行重载
interface InfoInter {
    name: string
    getRes(input: string): number
}
interface InfoInter {
    age: number
    getRes(input: number): string
}
// 相当于
/*interface InfoInter {
    name: string
    age: number
}*/
let infoInter: InfoInter
infoInter = {
    name: 'a',
    age: 12,
    getRes(input: any): any {
        return typeof input === 'string' ? input.length : `${input}`
    }
}

// 3. 多个同名的 namespace 会合并
namespace Validations {
    export const checkNumber = (val: any): boolean => typeof val === 'number'
}
