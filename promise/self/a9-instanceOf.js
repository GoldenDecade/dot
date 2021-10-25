function myInstance(left, right) {
    while(true) {
        if(left === null) {
            return false;
        }
        if(left.__proto__ === right.prototype) {
            return true;
        }
        left = left.__proto__;
    }
}
// 需要一直循环的,就要考虑 while
