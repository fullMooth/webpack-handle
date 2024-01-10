const path = require('path')

console.log(path.sep) // 返回的是当前操作系统下的目录分隔符 windows下是 \
console.log(path.posix.sep) // 返回Linux中的分隔符 永远都是/
console.log(path.win32.sep) // 返回windows中的路径分隔符 永远都是 \

const async = require('neo-async')

const arr = [1,2,3]
console.time('cost')
// 所有异步任务都执行完成才会触发回调，相当于Promise.all
async.forEach(arr, function(elem, callback) {
    setTimeout(() => {
        callback()
    }, 1000 * elem);
}, function () {
    console.timeEnd('cost')
})