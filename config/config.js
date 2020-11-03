import routes from './router.config';
import { join } from 'path';
export default {
    antd: {
        //compact: true // 开启紧凑主题
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
    outputPath: process.env.BUILD_TYPE == 'mes' ? './mes' : './dist',
    lessLoader: { javascriptEnabled: true },
    //配置图片文件是否走 base64 编译的阈值。默认是 10000 字节，少于他会被编译为 base64 编码，否则会生成单独的文件
    inlineLimit: 10000,
    favicon: '/favicon.ico',
    define: {
        'process.env':
            process.env.NODE_ENV == 'production'
                ? require('./pro.env')
                : require('./dev.env'),
    },
    chainWebpack: (config) => {
        config.module
            .rule('js')
            .test(/\.(js|mjs|jsx|ts|tsx)$/)
            .include.add(join(__dirname, '..', '..', 'src'))
            .end()
            .exclude.add(/node_modules/)
            .end()
            .use('babel-loader');
    },

    manifest: {
        basePath: '/',
    },
};
