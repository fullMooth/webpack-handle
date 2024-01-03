const EntryOptionPlugin = require('./EntryOptionPlugin')
class WebpackOptionsApply {
    process(options, compiler) {
        console.log(compiler)
        new EntryOptionPlugin().apply(compiler) // 在这个插件里注册 entryOption钩子
        compiler.hooks.entryOption.call(options.context, options.entry)
    }
}

module.exports = WebpackOptionsApply