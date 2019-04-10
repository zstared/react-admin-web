import { getUserList, create, update, updateState, deleteUser, getUserPermission, savePermission } from '@/services/user'
import { getRoleDropList } from '@/services/role'
export default {
    namespace: 'user',
    state: {
        data: [],
        params: {},
        roleList: [],
        permission: {}
    },
    effects: {
        /**获取用户列表 */
        *getList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getUserList, payload);
                if (!code) {
                    yield put({
                        type: 'setData',
                        payload: { data: data, params: payload }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        /**新增用户 */
        *create({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(create, payload);
                if (!code) {
                    const params = yield select(state => state.user.params);
                    yield put({
                        type: 'getList',
                        payload: params,
                    })
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        },

        /**修改用户 */
        *update({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(update, payload);
                if (!code) {
                    const params = yield select(state => state.user.params);
                    yield put({
                        type: 'getList',
                        payload: params,
                    })
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        },

        /**禁用、启用用户 */
        *updateState({ payload, callback }, { call, put, select }) {
            try {
                const { code, message } = yield call(updateState, payload);
                if (!code) {
                    let { data, params } = yield select(state => state.user)
                    let index = data.rows.findIndex((item) => {
                        return item.id == payload.id
                    });
                    data.rows[index].status = payload.status;
                    yield put({
                        type: 'setData',
                        payload: { data: data, params: params }
                    })
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        },

        /**删除用户 */
        *delete({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(deleteUser, payload);
                if (!code) {
                    let { data, params } = yield select(state => state.user)
                    let index = data.rows.findIndex((item) => {
                        return item.id == payload.id
                    });
                    data.rows[index].status = 2;
                    yield put({
                        type: 'setData',
                        payload: { data: data, params: params }
                    })
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        },

        /**获取角色下拉列表 */
        *getRoleDropList(_, { call, put }) {
            try {
                const { code, data } = yield call(getRoleDropList);
                if (!code) {
                    yield put({
                        type: 'setRoleList',
                        payload: data
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },

        /**获取用户权限 */
        *getPermission({ payload, callback }, { call, put }) {
            try {
                const { code, data } = yield call(getUserPermission, payload);
                if (!code) {
                    yield put({
                        type: 'setPermission',
                        payload: data
                    })
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        },
        /**保存权限 */
        *savePermission({ payload, callback }, { call }) {
            try {
                const { code } = yield call(savePermission, payload);
                if (!code) {
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
    reducers: {
        /**设置列表数据 */
        setData(state, { payload }) {
            return {
                ...state,
                data: { ...payload.data },
                params: { ...payload.params }
            }
        },
        /**设置角色下拉列表数据 */
        setRoleList(state, { payload }) {
            return {
                ...state,
                roleList: payload
            }
        },
        /**设置用户权限 */
        setPermission(state, { payload }) {
            return {
                ...state,
                permission: payload,
            }
        }
    }
}