const stats = {
    errors: [], // 错误信息
    warnings: [], // 警告信息
    version: '4.47.0', // webpack的版本号
    hash: 'aac7db29d6a8fd3c7f62', // hash值
    time: 43,
    builtAt: 1702525069435,
    publicPath: '', // 访问路径，需要更具体点
    outputPath: 'e:\\learn-center\\Front-End\\github-resp\\webpack-handle\\dist', // 文件输出路径
    assetsByChunkName: { main: 'main.aac.js' }, // chunk和入口文件的映射
    // 输出的文件列表
    assets: [
      {
        name: 'main.aac.js',
        size: 952,
        chunks: [Array],
        chunkNames: [Array],
        info: [Object],
        emitted: true,
        isOverSizeLimit: undefined
      }
    ],
    filteredAssets: 0,
    // 入口文件
    entrypoints: {
      main: {
        chunks: [Array],
        assets: [Array],
        children: {},
        childAssets: {},
        isOverSizeLimit: undefined
      }
    },
    namedChunkGroups: {
      main: {
        chunks: [Array],
        assets: [Array],
        children: {},
        childAssets: {},
        isOverSizeLimit: undefined
      }
    },
    // 打包过程中的chunk
    chunks: [
      {
        id: 0,
        rendered: true,
        initial: true,
        entry: true,
        recorded: undefined,
        reason: undefined,
        size: 22,
        names: [Array],
        files: [Array],
        hash: '5b3bf16d428831bb287a',
        siblings: [],
        parents: [],
        children: [],
        childrenByOrder: {},
        modules: [Array],
        filteredModules: 0,
        origins: [Array]
      }
    ],
    // 所用到的模块列表
    modules: [
      {
        id: 0,
        identifier: 'e:\\learn-center\\Front-End\\github-resp\\webpack-handle\\src\\index.js',
        name: './src/index.js',
        index: 0,
        index2: 0,
        size: 22,
        cacheable: true,
        built: true,
        optional: false,
        prefetched: false,
        chunks: [Array],
        issuer: null,
        issuerId: null,
        issuerName: null,
        issuerPath: null,
        profile: undefined,
        failed: false,
        errors: 0,
        warnings: 0,
        assets: [],
        reasons: [Array],
        usedExports: true,
        providedExports: null,
        optimizationBailout: [Array],
        depth: 0,
        source: "console.log('webpack')"
      }
    ],
    filteredModules: 0,
    logging: {
      'webpack.buildChunkGraph.visitModules': { entries: [], filteredEntries: 2, debug: false }
    },
    children: []
  }
  