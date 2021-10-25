let count = 0;
function quickSort(arr) {
    if(arr.length < 2){
        return arr;
    }
    count++;
    let cur = arr[arr.length -1];
    let left = arr.filter((elem, index) => elem <= cur && index !== arr.length -1 );
    let right = arr.filter((elem, index) => elem > cur);
    return [...quickSort(left), cur, ...quickSort(right)];
}

var arr = [2,4,3,7,5,7,8,9,1,4,5,6,7];
console.log(arr.length);
console.log(quickSort(arr));
console.log(count);
