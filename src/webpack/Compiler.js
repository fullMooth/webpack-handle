const { Tapable, SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable')
const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')
class Compiler extends Tapable {
    constructor(context) {
        super()
        this.options = {} // 这里是默认配置
        // 能同步就不要异步，能并行就不要串行
        this.hooks = { // compiler实例上会挂载很多钩子
            // 入口选项解析入口
            entryOption: new SyncBailHook(['contxt', 'entry']),
            // 真正地开启构建流程
            make: new AsyncParallelHook(['compilation']),
            beforeRun: new AsyncSeriesHook(['compiler']), // 运行前
            run: new AsyncSeriesHook(['compiler']), // 运行
            beforeCompile: new AsyncSeriesHook(['params']), // 编译前
            compile: new SyncHook(['params']), // 编译
            thisCompilation: new SyncHook(['compilation', 'params']), // 开启一次新的编译
            compilation: new SyncBailHook(['compilation', 'params']), // 创建成功一次新的compilation对象
            done: new AsyncSeriesHook(['stats']) // 编译完成
        }
        this.context = context // compiler.context=当前工作目录
    }
    run(callback) {
        //console.log('compiler.run')
        // callback(null, {
        //     toJson() {
        //         // 这里先写一个假的toJson方法，后期再该成真的
        //         return {
        //             entries: true,// 显示入口
        //             chunks: true, // 显示打包出来的代码块
        //             modules: true, // 以数组方式放置置模块
        //             _modules: true, // 以对象的方式放置模块
        //             assets: true // 产出的文件或者资源  
        //         }
        //     }
        // })
        // 编译成功的回调
        const onCompiled = (error, compilation) => {
            callback(null, {})
        }

        // 运行前
        this.hooks.beforeRun.callAsync(this, (err) => {
            // 运行
            this.hooks.run.callAsync(this, err => {
                this.compile(onCompiled)
            })
        })
    }

    compile(onCompiled) {
        const params = this.newCompilationParams() // 创建参数
        this.hooks.beforeCompile.callAsync(params, (err) => {
            // 触发compile事件
            this.hooks.compile.call(params)
            // 生成一次编译的compilation对象
            let compilation = this.newCompilation(params)
            // 触发singleEntryPlugin里注册的make事件
            // 这里让所有的入口同时开始执行编译，全部编译成功后才执行onCompiled
            this.hooks.make.callAsync(compilation, (err) => {
                onCompiled(err, compilation)
            })
        })
    }

    newCompilation(params){
        const compilation = new Compilation(this)
        // 开启一次编译
        this.hooks.thisCompilation.call(compilation, params)
        // 开始编译
        this.hooks.compilation.call(compilation, params)
        return compilation
    }

    newCompilationParams() {
        // 普通模块工厂， 在webpack中是靠模块工厂来创建模块的
        return {
            normalModuleFactory: new NormalModuleFactory()
        }
    }
}

module.exports = Compiler