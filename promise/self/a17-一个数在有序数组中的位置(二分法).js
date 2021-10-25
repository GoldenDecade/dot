// 必须是有序数组
function search(arr, target, start, end) {
    let targetIndex = -1;
    if(start > end) {
        return targetIndex;
    }
    let mid = Math.floor((start + end) / 2);
    if(arr[mid] === target) {
        return mid;
    }
    if(arr[mid] > target) {
        return search(arr, target, start, mid - 1);
    }else {
        return search(arr, target, mid + 1, end);
    }
}
