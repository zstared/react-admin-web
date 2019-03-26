
import { login,logout } from '../services/oauth';
import { getPermissionList } from '../services/resource'
import router from 'umi/router';
import { encryptData } from '../utils/utils'

let expandedKeys = []
const generateExpandedKeys = (treeData) => {
    treeData.map(item => {
        if (item.children && item.children.length > 0) {
            generateExpandedKeys(item.children)
        }
        if (item.resource_type == 2) {
            expandedKeys.push(item.key + '');
        }
    })
}

export default {
    namespace: 'oauth',
    state: {
        resourceTreeData: [],
        defaultExpandedKeys: [],
    },
    effects: {
        //登录
        *login({ payload }, { call }) {
            try {
                const response = yield call(login, payload);
                const { code, data: { token } } = response;
                if (!code) {
                    localStorage.setItem('token', token);
                    router.push('/');
                    //记住密码
                    const { user_name, password, remember } = payload;
                    localStorage.setItem('user_name', remember ? user_name : '');
                    localStorage.setItem('password', remember ? encryptData(password, 'zhengxinhong') : '')
                }
            } catch (e) {
                console.log(e)
            }
        },
        //注销
        *logout({ payload }, { call }) {
            try {
                const response = yield call(logout, payload);
                const { code } = response;
                if (!code) {
                    localStorage.removeItem('token')
                    router.push('/login');
                }
            } catch (e) {
                console.log(e)
            }
        },
        //权限
        *treePermissionList({ callback }, { call, put }) {
            try {
                const response = yield call(getPermissionList);
                const { code, data } = response;
                if (!code) {
                    yield put({
                        type: 'setResource',
                        payload: data
                    })
                }
                callback();
            } catch (e) {
                console.log(e)
            }
        }
    },
    reducers: {
        setResource(state, { payload }) {
            expandedKeys = []
            generateExpandedKeys(payload)
            return {
                ...state,
                resourceTreeData: payload,
                defaultExpandedKeys: expandedKeys
            }
        }
    }
}