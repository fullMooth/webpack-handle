class SingleEntryPlugin {
    /**
     * 
     * @param {*} context 当前工作目录，也就是根目录
     * @param {*} entry 入口 src/index.js
     * @param {*} name 入口名称 默认是 main
     */
    constructor(context, entry, name) {
        this.context = context
        this.entry = entry
        this.name = name
    }
    apply(compiler) {
        // 监听make事件 在回调里开始真正的编译 该事件由compiler的compile方法里来触发
        compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
            // 在这里开始真正的编译入口
            compilation.addEntry(this.context, this.entry, this.name, callback)
        })
    }
}

module.exports = SingleEntryPlugin