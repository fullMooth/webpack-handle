const NormalModule = require('./NormalModule')
class NormalModuleFactory {
    /**
     * 创建模块
     * @param {*} data 创建模块所需配置
     * @returns 模块
     */
    create(data) {
        return new NormalModule(data)
    }
}

module.exports = NormalModuleFactory