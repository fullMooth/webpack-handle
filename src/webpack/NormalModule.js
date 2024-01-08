class NormalModule {
    /**
     * rawRequest 原生请求路径，也就是入口路径
     * @param {*} param0 
     */
    constructor({name, context, rawRequest, resource, parser}) {
        this.name = name
        this.context = context
        this.rawRequest = rawRequest
        this.resource = resource // 入口绝对路径 
        this.parser = parser
        this._source = null // 存储读出的源码
        this._ast = null // 存储源码转换后的ast语法树
    }

    build(compilation, callback) {
        // 真正去执行编译
        this.doBuild(compilation, (err) => {
            this._ast = this.parser.parse(this._source)
            callback()
        })
    }

    doBuild(compilation, callback) {
        this.getSrouce(compilation, (err, data) => {
            this._source = data // 将读出源码存在_source属性上
            callback()
        })
    }

    /**
     * 读取源码
     * @param {*} compilation 
     */
    getSource(compilation, callback) {
        compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
    }
}
module.exports = NormalModule