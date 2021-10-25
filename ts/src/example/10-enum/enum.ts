// 数字枚举

const getIndex =() => 2;// 这里会处理很多逻辑,最终得出状态值
enum Status {
    Uploading,
    Success = getIndex(),
    Fail = 3,
    Resolve
}

console.log(Status);
console.log(Status.Uploading);

// 字符串枚举
enum Status1 {
    Uploading= 'loading',
    Success = 'succ',
    Fail = 'fail',
    Resolve = Success
}

console.log(Status1);


//  枚举的每个成员和枚举值都可以当做 类型 来使用
// 1. enum E {A}
// 2. enum E {A = 'a'}
// 3. enum E {A = 2}

enum Animals {
    Dog = 1,
    Cat = 2
}
interface Dog {
    type: Animals.Dog
    type_name: Animals
}
const dog: Dog = {
    // type: Animals.Dog
    type: 1,
    type_name: Animals.Dog
}
