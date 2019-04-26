import routes from './router.config';
export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true,
      },
      targets: {
        ie: 11,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
      },
    //   dll: {
    //     include: ['dva', 'dva/router', 'dva/saga'],
    //     exclude: ['@babel/runtime'],
    //   },
     // hardSource: true,
    }]
  ],
  routes: routes,
  theme: {
    'primary-color': '#722ED1',
  },
  // externals: {
  //     '@antv/data-set': 'DataSet',
  //   },
  outputPath: process.env.BUILD_TYPE == 'docs' ? './docs' : './dist',
//   publicPath: process.env.BUILD_TYPE == 'docs' ? './' : '/',
//   base: process.env.BUILD_TYPE == 'docs' ? './' : '/',
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `zxh${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  chainWebpack(config, { webpack }) {
    
    // code split @ant-design/icons
    config.module
    .rule('@ant-design/icons')
    .include.add(require.resolve('@ant-design/icons/lib/dist')).end()
    .use('ant-icon')
    .loader('webpack-ant-icon-loader');
   },
  manifest: {
    basePath: '/',
  },
}
