const path = require('path')
// const abc = require('babel-types')
const types = require('babel-types') // 判断节点类型或者生成某个节点
const generate = require('babel-generator').default // 注意这里需要引入default，用于生成代码
const traverse = require('babel-traverse').default // 用于遍历节点

class NormalModule {
    /**
     * rawRequest 原生请求路径，也就是入口路径
     * @param {*} param0 
     */
    constructor({name, context, rawRequest, resource, parser, moduleId}) {
        this.name = name
        this.context = context
        this.rawRequest = rawRequest
        this.resource = resource // 入口绝对路径 
        this.parser = parser
        this._source = null // 存储读出的源码
        this._ast = null // 存储源码转换后的ast语法树
        this.moduleId = moduleId // 当前模块的模块ID
        this.dependencies = [] // 此模块依赖的模块 
    }

    build(compilation, callback) {
        // 真正去执行编译
        this.doBuild(compilation, (err) => {
            // 先将源代码转换为抽象语法树
            let ast = this.parser.parse(this._source)
            // 遍历修改节点， 分析require import等依赖
            traverse(ast, {
                CallExpression: (nodePath) =>{
                    let node = nodePath.node
                    // require方法调用，替换为__webpack_require__
                    if (node.callee.name === 'require') {
                        node.callee.name = '__webpack_require__'
                        let moduleName = node.arguments[0].value // ./tilte
                        // 如果这个名字有后缀名则不需要再添加后缀名，否则添加.js后缀名（暂时只考虑.js后缀名的情况）
                        let extension = moduleName.split(path.posix.sep).pop().indexOf('.') == -1 ? '.js' : ''
                        // 获取根目录到依赖模块的绝对路径
                        let depResource = path.resolve(
                            path.posix.dirname(this.resource), // 当前模块的绝对路径
                            moduleName + extension // 依赖模块的相对路径
                        )
                        // 获取依赖路径的模块id
                        let depModuleId = '.' + path.posix.sep + path.posix.relative(this.context, depResource)
                        // 将模块存储到模块依赖的数组中
                        this.dependencies.push({
                            name: this.name, // 当前模块和它的依赖模块属于同一个chunk，所以name是一样的
                            context: this.context, // 项目根目录
                            rawRequest: moduleName, // 原始加载路径 ./title
                            moduleId: depModuleId, // 依赖模块的模块id
                            resource: depResource, // 模块的绝对路径
                        })
                        // 修改此节点参数名称为depModuleId 依赖模块id
                        node.arguments = [types.stringLiteral(depModuleId)]
                    }
                }
            })
            let { code } = generate(ast)
            this._source = code
            this._ast = ast
            callback()
        })
    }

    doBuild(compilation, callback) {
        this.getSource(compilation, (err, data) => {
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