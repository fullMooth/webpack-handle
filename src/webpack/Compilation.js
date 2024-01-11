const { Tapable, SyncHook } = require('tapable')
const NormalModuleFactory = require('./NormalModuleFactory')
const path = require('path')
const Parser = require('./Parser')
const async = require('neo-async') // 并发执行异步任务 类似Promise.all()


const parser = new Parser()
class Compilation extends Tapable {
    constructor(compiler) {
        super()
        this.compiler = compiler // 编译器
        this.options = compiler.options // 编译选项  配置
        this.context = compiler.context // 上下文路径 即项目根目录
        this.inputFileSystem = compiler.inputFileSystem // 文件输入系统
        this.outputFileSystem = compiler.outputFileSystem // 文件输出系统
        this.entries = [] // 放着入口模块
        this.modules = [] // 所有打包进来的模块
        this._modules = {} // key 是模块ID value是模块对象
        this.hooks = {
            // 当一个模块依赖成功后会执行这个钩子
            succeedModule: new SyncHook(['module'])
        }
    }
    /**
     * 真正开始添加入口并开始编译
     * @param {*} context 项目根目录
     * @param {*} entry 文件入口
     * @param {*} name 入口名称
     * @param {*} callback 编译成功的回调
     */
    addEntry(context, entry, name, callback) {
        this._addModuleChain(context, entry, name, (err, module) => {
            callback()
        })
    }
    /**
     * 创建模块链条 也就是创建一个chunk
     * @param {*} context 
     * @param {*} entry 
     * @param {*} name 
     * @param {*} callback 
     */
    _addModuleChain(context, entry, name, callback) {
        // 创建模块工厂
        const moduleFactory = new NormalModuleFactory()
        // 创建模块
        const module = moduleFactory.create({
            name, // 所属代码块的名称  相当于chunkName
            context: this.context, // 上下文、工作目录
            rawRequest: entry, // src/index.js
            resource: path.posix.join(context, entry), // 此模块的绝对路径
            parser
        })

        // 模块ID是一个相对于项目根目录的相对路径 例如index.js的moduleId是 ./src/index.js  title.js 是 ./src/title.js
        module.moduleId = '.' + path.posix.sep + path.relative(this.context, module.resource)
        // return module
        //console.log(module)
        this.entries.push(module) // 将模块放入到入口数组中
        this.modules.push(module) // 将模块放入到整个模块数组中
        const afterBuild = (err, module) => {
            if (module.dependencies) { // 如果当前模块依赖于其他模块，则递归编译其依赖的模块
                this.processModuleDependencies(module, (err) => {
                    // 当这个入口模块和它所依赖的所有模块都编译完成后，才会调用用callback
                    callback(err, module)
                })
            } else {
                callback(err, module)
            }
        }

        // 去编译模块
        this.buildModule(module, afterBuild)
    }

    processModuleDependencies(module, callback) {
        callback()
    }

    buildModule(module, afterBuild) {
        module.build(this, (err) => {
            this.hooks.succeedModule.call(module)
            afterBuild(null, module)
        })
    }
}
module.exports = Compilation