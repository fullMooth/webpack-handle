
const fs = require('fs')
// webpack源码中多了缓存的逻辑
class NodeEnvironmentPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.inputFileSystem = fs // 设置读文件模块
        compiler.outputFileSystem = fs // 设置写文件模块
    }
}

module.exports = NodeEnvironmentPlugin