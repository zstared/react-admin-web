import { getRoleList, create, update, deleteRole } from '@/services/role'

export default {
    namespace: 'role',
    state: {
        data: [],
        params: {},
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
                    let { data, params } = yield select(state => state.role)
                    let index = data.rows.findIndex((item) => {
                        return item.role_id == payload.role_id
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
    }
}