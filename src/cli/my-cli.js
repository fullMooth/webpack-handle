const path = require('path')
const webpack = require('../webpack')

debugger
// 读取webpack.config.js里的配置 /webpack.config
const webpackOptions = require(path.resolve(process.cwd(), 'webpack.config'))

// webpack 执行会返回 compiler 对象
const compiler = webpack(webpackOptions)

// 运行run方法开始执行编译流程
compiler.run((err, stats) => {
    // console.log(err, stats)
    console.log(stats.toJson({
        entries: true,// 显示入口
        chunks: true, // 显示打包出来的代码块
        modules: true, // 以数组方式放置置模块
        _modules: true, // 以对象的方式放置模块
        assets: true // 产出的文件或者资源
    }))
    console.log(stats)
})

/**
 * cli做的事情很简单
 * 1. 调用webpack函数生成compiler对象
 * 2. 调用compiler的run方法开始执行编译
 */