import defaultSettings from '../defaultSettings';
import {
    getMenus,
    getCurrentUser,
    updateCurrentUser,
    updatePassword,
} from '../services/user';
import pathToRegexp from 'path-to-regexp';
import { formatMessage } from 'umi';
import { urlToList } from '../utils/utils';

/**菜单导航标签数据 */
const navData = {};
/**生成菜单导航标签数据 */
const generateNavData = function (data) {
    data.map((item) => {
        if (item.resource_type != 3) {
            if (item.children && item.children.length > 0) {
                generateNavData(item.children);
            }
            navData[item.path] = {
                ...item,
                name: formatMessage({
                    id: 'menu.' + item.locale,
                }),
            };
        }
    });
};

/**根据路由url获取菜单导航标签项 */
const getNavItem = (url) => {
    let navItem = navData[url];
    if (!navItem) {
        Object.keys(navData).forEach((item) => {
            if (pathToRegexp(item).test(url)) {
                navItem = navData[item];
            }
        });
    }
    return navItem || null;
};

/**根据路由url获取面包屑列表 */
const getBreadcrumpList = (url) => {
    return urlToList(url)
        .map((item) => getNavItem(item))
        .filter((item) => item);
};

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
        currentUser: {},
    },
    effects: {
        //获取当前用户信息
        *getCurrentUser(_, { call, put, select }) {
            try {
                const response = yield call(getCurrentUser);
                const {
                    code,
                    data: { base, menus },
                } = response;
                if (!code) {
                    //基本信息
                    yield put({
                        type: 'setCurrentUser',
                        payload: base,
                    });

                    //菜单
                    yield put({
                        type: 'setMenus',
                        payload: menus ? menus : [],
                    });
                    const { navStyle } = yield select((state) => state.app);
                    if (navStyle === 'breadcrumb') {
                        yield put({
                            type: 'setBreadcrumb',
                            payload: null,
                        });
                    } else {
                        yield put({
                            type: 'addNav',
                            payload: null,
                        });
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },

        //修改当前用户信息
        *updateCurrentUser({ payload, callback }, { call, put }) {
            try {
                const response = yield call(updateCurrentUser, payload);
                const { code, message } = response;
                if (!code) {
                    yield put({
                        type: 'setCurrentUser',
                        payload: payload,
                    });
                    if (callback) callback();
                }
            } catch (e) {
                console.log(e);
            }
        },

        /**修改用户密码 */
        *updatePassword({ payload, callback }, { call, put }) {
            try {
                const response = yield call(updatePassword, payload);
                const { code, message, data } = response;
                if (!code) {
                    yield put({
                        type: 'setCurrentUserPwd',
                        payload: data,
                    });
                    if (callback) callback();
                }
            } catch (e) {}
        },

        /**添加菜单导航标签或面包屑 */
        *setNavBar({ payload }, { put, select }) {
            try {
                const { navStyle } = yield select((state) => state.app);
                if (navStyle === 'breadcrumb') {
                    yield put({
                        type: 'setBreadcrumb',
                        payload: payload,
                    });
                } else {
                    const navItem = getNavItem(payload);
                    if (navItem) {
                        yield put({
                            type: 'addNav',
                            payload: navItem,
                        });
                    }
                }
            } catch (e) {}
        },
    },
    reducers: {
        /**侧边栏收缩、展开切换 */
        toggleCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        /**关闭导航菜单 */
        removeNav(state, { payload }) {
            return {
                ...state,
                navs: payload,
            };
        },
        /**添加导航菜单 */
        addNav(state, { payload }) {
            let { navs, navActiveKey } = state;
            let activeNav = payload ? payload : getNavItem(navActiveKey);
            if (
                activeNav &&
                navs.some((item) => item.path === activeNav.path)
            ) {
                return {
                    ...state,
                };
            } else {
                let newNavs = [...navs];
                if (activeNav) newNavs.push(activeNav);
                return {
                    ...state,
                    navs: newNavs,
                };
            }
        },

        /**激活导航菜单 */
        activeNav(state, { payload }) {
            return {
                ...state,
                navActiveKey: payload ? payload : '/home',
            };
        },

        /**设置菜单 */
        setMenus(state, { payload }) {
            generateNavData(payload);
            return {
                ...state,
                menuData: payload,
            };
        },

        /**设置面包屑 */
        setBreadcrumb(state, { payload }) {
            const list = getBreadcrumpList(
                payload ? payload : state.navActiveKey
            );
            return {
                ...state,
                breadcrumbList: [...list],
            };
        },

        /**设置当前用户信息 */
        setCurrentUser(state, { payload }) {
            return {
                ...state,
                currentUser: { ...payload },
            };
        },

        /**设置当前用户密码信息 */
        setCurrentUserPwd(state, { payload }) {
            const pre_currentUser = Object.assign(state.currentUser, payload);
            return {
                ...state,
                currentUser: { ...pre_currentUser },
            };
        },

        /**设置侧边栏风格 */
        setSideStyle(state, { payload }) {
            localStorage.setItem('siderStyle', payload);
            return {
                ...state,
                siderStyle: payload,
            };
        },

        /**设置导航栏风格 */
        setNavStyle(state, { payload }) {
            localStorage.setItem('navStyle', payload);
            return {
                ...state,
                navStyle: payload,
            };
        },

        /**设置色弱模式 */
        setColorWeak(state, { payload }) {
            document.body.className = payload ? 'colorWeak' : '';
            localStorage.setItem('colorWeak', payload);
            return {
                ...state,
                colorWeak: payload,
            };
        },
    },
    subscriptions: {
        setup({ dispatch, history, state }) {
            history.listen((router) => {
                const { pathname } = router;

                dispatch({
                    type: 'setNavBar',
                    payload: pathname,
                });

                dispatch({
                    type: 'activeNav',
                    payload: pathname,
                });
            });
        },
    },
};
