/**
 * 导出一个webpack函数
 * 1. 
 */
const path = require('path')
const NodeEnvironmentPlugin = require('NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')
module.exports = function webpack(options) {
    // 设置上下文
    options.context = options.context || path.resolve(process.cwd())
    // 合并配置 配置来源：默认配置、配置文件webpack.config.js配置、shell参数配置
    const compiler = new Compiler(options.context)
    // 将compiler的默认配置与webpack.config.js配置合并
    compiler.options = Object.assign(compiler.options, options)
    // webpack在打包过程中会用fs读写文件，在热更新时，webpack-dev-server会使用 memory-fs来读写（只写到内存中）
    new NodeEnvironmentPlugin(options).apply(compiler)

    // 挂载配置文件里的插件
    if (options.plugins && Array.isArray(options.plugins)) {
        for(const plugin of options.plugins) {
            plugin.apply(compiler)
        }
    }

    // 挂载默认插件
    new WebpackOptionsApply().process(options, compiler)

    return compiler
}