export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva:{
                hmr:true,
            },
            locale: {
                enable: true, 
                default: 'zh-CN', 
                baseNavigator: true, 
            },
        }]
    ],
    routes: [{
        path: '/login',
        component: './User/Login'
    }],
    cssnano: {
        mergeRules: false,
    },
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
}