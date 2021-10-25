var arr1;
arr1 = [1, 2, 3];
var arr2;
arr2 = [1, 2];
var arr3;
// 元组类型 必须完全对应
var tuple;
tuple = ['a', 1, false];
// 枚举类型, 可以自定义数字
var Roles;
(function (Roles) {
    Roles[Roles["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    Roles[Roles["ADMIN"] = 3] = "ADMIN";
    Roles[Roles["USER"] = 4] = "USER";
})(Roles || (Roles = {}));
// any类型
var value = 123;
// void类型 --> null | undefined
var consoleText = function (text) {
    console.log(text);
};
var v;
v = null;
v = undefined;
// v = 123;//这样就报错
// never类型  返回never的函数必须存在无法达到的终点
var infiniteFunc = function () {
    while (true) {
        console.log(1);
    }
};
// 类型断言
var getLength = function (target) {
    if (target.length || target.length === 0) {
        return target.length;
    }
    else {
        return target.toString().length;
    }
};
getLength(234);
