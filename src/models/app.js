import defaultSettings from '../defaultSettings'
import { getMenus } from '../services/user';
import { formatMessage } from 'umi/locale';
/**菜单导航标签数据 */
const navData = {};
/**生成菜单导航标签数据 */
const generateNavData = function (data) {
    data.map(item => {
        if (item.children && item.children.length > 0) {
            generateNavData(item.children)
        }
        navData[item.path] = {
            ...item,
            name: formatMessage({ id: 'menu.' + item.locale })
        };
    })
}

/**根据路由url获取菜单导航标签项 */
const getNavItem = (url) => {
    let navItem = navData[url];
    // if (!navItem) {
    //   Object.keys(navData).forEach(item => {
    //     if (pathToRegexp(key).test(url)) {
    //         navItem = navData[key];
    //     }
    //   });
    // }
    return navItem || {};
};

export default {
    namespace: 'app',
    state: {
        collapsed: false, //侧边栏收缩/折叠状态
        siderStyle: defaultSettings.siderStyle,//侧边栏样式 dark or light
        menuData: [],//菜单数据
        navs: [],//当前菜单导航标签项 
        navActiveKey: '',//当前打开的菜单
    },
    effects: {
        *getMenus(_, { call, put }) {
            try {
                const response = yield call(getMenus);
                const { data:{menuData} } = response;
                console.log(menuData)
                yield put({
                    type: 'setMenus',
                    payload: menuData?menuData:[]
                })
            } catch (e) {
                console.log(e)
            }
        }
    },
    reducers: {
        /**侧边栏收缩、展开切换 */
        toggleCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload
            }
        },
        /**关闭导航菜单 */
        removeNav(state, { payload }) {
            return {
                ...state,
                navs: payload
            }
        },
        /**添加导航菜单 */
        addNav(state, { payload }) {
            let { navs } = state;
            if (navs.some(item => item.path === payload.path)) {
                return {
                    ...state,
                }
            } else {
                navs.push(payload);
                return {
                    ...state,
                    navs: navs
                }
            }
        },

        /**激活导航菜单 */
        activeNav(state, { payload }) {
            return {
                ...state,
                navActiveKey: payload ? payload : '/home'
            }
        },

        /**设置菜单 */
        setMenus(state, { payload }) {
            generateNavData(payload)
            return {
                ...state,
                menuData: payload
            }
        }


    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((router) => {
                const { pathname } = router;
                //添加菜单导航标签
                const navItem = navData[pathname]
                if (navItem) {
                    dispatch({
                        type: 'addNav',
                        payload: navItem
                    })
                }
                dispatch({
                    type: 'activeNav',
                    payload: pathname
                })
            })
        }
    }

}