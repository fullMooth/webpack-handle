const { Tapable } = require('tapable')
const babylon = require('babylon')

class Parser extends Tapable {
    /**
     * 将源代码转换为ast语法树
     * @param {*} source 源码字符串
     * @returns ast语法树
     */
    parse(source) {
        const astTree = babylon.parse(source, {
            sourceType: 'module', // 源代码类型是 module
            plugins: ['dynamicImport'] // 动态导入类型 例如import('./title.js')
        })
        return astTree
    }
}
module.exports = Parser