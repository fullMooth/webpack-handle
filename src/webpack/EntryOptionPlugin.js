const SingleEntryPlugin = require('./SingleEntryPlugin')
class EntryOptionPlugin {
    apply(compiler) {
        // console.log(compiler)
        // 当有一个entryOption 事件钩子触发时候，会执行回调，并传入context和entry
        // context永远指向根目录   entry指向配置的入口  /src/index.js
        compiler.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
            // 创建SingleEntryPlugin 单入口的默认名字就是main
            new SingleEntryPlugin(context, entry, 'main').apply(compiler)
        })
    }
}
module.exports = EntryOptionPlugin