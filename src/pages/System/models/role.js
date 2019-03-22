import { getRoleList, create, update, deleteRole, getRolePermission, savePermission } from '@/services/role'

export default {
    namespace: 'role',
    state: {
        data: [],
        params: {},
        permission: [],
    },
    effects: {
        /**获取角色列表 */
        *getList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getRoleList, payload);
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
        /**新增角色 */
        *create({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(create, payload);
                if (!code) {
                    const params = yield select(state => state.role.params);
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

        /**修改角色 */
        *update({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(update, payload);
                if (!code) {
                    const params = yield select(state => state.role.params);
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


        /**删除角色 */
        *delete({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(deleteRole, payload);
                if (!code) {
                    const params = yield select(state => state.role.params);
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
        /**获取角色权限 */
        *getPermission({ payload, callback }, { call, put }) {
            try {
                const { code, data } = yield call(getRolePermission, payload);
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
        /**设置角色权限 */
        setPermission(state, { payload }) {
            return {
                ...state,
                permission: payload,
            }
        }
    }
}