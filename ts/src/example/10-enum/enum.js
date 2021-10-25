// 数字枚举
var getIndex = function () { return 2; }; // 这里会处理很多逻辑,最终得出状态值
var Status;
(function (Status) {
    Status[Status["Uploading"] = 0] = "Uploading";
    Status[Status["Success"] = getIndex()] = "Success";
    Status[Status["Fail"] = 3] = "Fail";
    Status[Status["Resolve"] = 4] = "Resolve";
})(Status || (Status = {}));
console.log(Status);
console.log(Status.Uploading);
// 字符串枚举
var Status1;
(function (Status1) {
    Status1["Uploading"] = "loading";
    Status1["Success"] = "succ";
    Status1["Fail"] = "fail";
    Status1["Resolve"] = "succ";
})(Status1 || (Status1 = {}));
console.log(Status1);
//  枚举的每个成员和枚举值都可以当做 类型 来使用
// 1. enum E {A}
// 2. enum E {A = 'a'}
// 3. enum E {A = 2}
var Animals;
(function (Animals) {
    Animals[Animals["Dog"] = 1] = "Dog";
    Animals[Animals["Cat"] = 2] = "Cat";
})(Animals || (Animals = {}));
var dog = {
    // type: Animals.Dog
    type: 1,
    type_name: Animals.Dog
};
