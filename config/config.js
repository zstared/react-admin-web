import routes from './router.config';
export default {
    antd: {
        compact: true, // 开启紧凑主题
    },
    dva: {
        hmr: true,
    },
    locale: {
        default: 'zh-CN',
        baseNavigator: true,
    },
    targets: {
        ie: 11,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },

    routes: routes,
    theme: {
        'primary-color': '#1890FF',
    },
    // externals: {
    //     '@antv/data-set': 'DataSet',
    //   },
    outputPath: process.env.BUILD_TYPE == 'docs' ? './docs' : './dist',
    //   publicPath: process.env.BUILD_TYPE == 'docs' ? './' : '/',
    //   base: process.env.BUILD_TYPE == 'docs' ? './' : '/',

    lessLoader: { javascriptEnabled: true },
    //配置图片文件是否走 base64 编译的阈值。默认是 10000 字节，少于他会被编译为 base64 编码，否则会生成单独的文件
    inlineLimit: 10000,

    define: {
        'process.env':
            process.env.NODE_ENV == 'production'
                ? require('./pro.env')
                : require('./dev.env'),
    },

    manifest: {
        basePath: '/',
    },
};
