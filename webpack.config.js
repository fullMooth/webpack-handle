const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:3].js',
        // clean: true  // webpack4的时候是没有这个配置的，使用插件来清空上次打包结果
    }
}