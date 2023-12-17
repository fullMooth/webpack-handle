
const fs = require('fs')
// webpack源码中多了缓存的逻辑
class NodeEnvironmentPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.inputFileSystem = fs
        compiler.outputFileSystem = fs
    }
}

module.exports = NodeEnvironmentPlugin