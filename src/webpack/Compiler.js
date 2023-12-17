const { Tapable } = require('tapable')

class Compiler extends Tapable {
    constructor(context) {
        super()
        this.options = {} // 这里是默认配置
        this.hooks = { // compiler实例上会挂载很多钩子

        }
        this.context = context // compiler.context=当前工作目录
    }
    run(callback) {
        console.log('compiler.run')
        callback(null, {
            toJson() {
                // 这里先写一个假的toJson方法，后期再该成真的
                return {
                    entries: true,// 显示入口
                    chunks: true, // 显示打包出来的代码块
                    modules: true, // 以数组方式放置置模块
                    _modules: true, // 以对象的方式放置模块
                    assets: true // 产出的文件或者资源  
                }
            }
        })
    }
}

module.exports = Compiler