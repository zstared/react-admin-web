import defaultSettings from '../defaultSettings'
import { getMenus,getCurrentUser } from '../services/user';
import pathToRegexp from 'path-to-regexp'
import { formatMessage } from 'umi/locale';
import { urlToList } from '../utils/utils'
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
            name: formatMessage({
                id: 'menu.' + item.locale
            })
        };
    })
}

/**根据路由url获取菜单导航标签项 */
const getNavItem = (url) => {
    let navItem = navData[url];
    if (!navItem) {
        Object.keys(navData).forEach(item => {
            if (pathToRegexp(item).test(url)) {
                navItem = navData[item];
            }
        });
    }
    return navItem || null;
};

/**根据路由url获取面包屑列表 */
const getBreadcrumpList = (url) => {
    return urlToList(url).map(item => getNavItem(item)).filter(item => item)
}

export default {
    namespace: 'app',
    state: {
        collapsed: false, //侧边栏收缩/折叠状态
        siderStyle: defaultSettings.siderStyle, //侧边栏样式 dark or light
        navStyle: defaultSettings.navStyle, //导航类型  breadcrumb-面包屑 nav-导航栏
        menuData: [], //菜单数据
        navs: [], //当前菜单导航标签项 
        navActiveKey: '', //当前打开的菜单
        breadcrumbList: [],
        currentUser:{}
    },
    effects: {
        /**获取菜单 */
        *getMenus(_, { call, put }) {
            try {
                const response = yield call(getMenus);
                const { data: { menuData } } = response;
                yield put({
                    type: 'setMenus',
                    payload: menuData ? menuData : []
                })
                if (defaultSettings.navStyle === "breadcrumb") {
                    yield put({
                        type: 'setBreadcrumb',
                        payload: null,
                    })
                } else {
                    yield put({
                        type: 'addNav',
                        payload: null,
                    })
                }

            } catch (e) {
                console.log(e)
            }
        },
        //获取当前用户信息
        *getCurrentUser(_, { call, put }) {
            try {
                const response = yield call(getCurrentUser);
                const { code, data } = response;
                if (!code) {
                    yield put({
                        type: 'setCurrentUser',
                        payload: data
                    })
                }
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
            let { navs, navActiveKey } = state;
            let activeNav = payload ? payload : getNavItem(navActiveKey);
            if (navs.some(item => item.path === activeNav.path)) {
                return {
                    ...state,
                }
            } else {
                let newNavs = [...navs];
                if (activeNav) newNavs.push(activeNav)
                return {
                    ...state,
                    navs: newNavs
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
        },

        /**设置面包屑 */
        setBreadcrumb(state, { payload }) {
            const list = getBreadcrumpList(payload ? payload : state.navActiveKey)
            return {
                ...state,
                breadcrumbList: list
            }
        },
        
        /**设置当前用户信息 */
        setCurrentUser(state, { payload }) {
            return {
                ...state,
                currentUser: payload
            }
        }


    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((router) => {
                const {
                    pathname
                } = router;
                //添加菜单导航标签
                const navItem = getNavItem(pathname)
                if (defaultSettings.navStyle === "breadcrumb") {
                    dispatch({
                        type: 'setBreadcrumb',
                        payload: pathname
                    })
                } else {
                    if (navItem) {
                        dispatch({
                            type: 'addNav',
                            payload: navItem
                        })
                    }
                }

                dispatch({
                    type: 'activeNav',
                    payload: pathname
                })
            })
        }
    }

}