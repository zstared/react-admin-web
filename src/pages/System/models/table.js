import { getColumns, createColumn, getList, updateColumn, deleteColumn } from '@/services/table'

export default {
    namespace: 'table',
    state: {
        data: [],
        params: {},
    },
    effects: {
        /**获取表格列表 */
        *getList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getList, payload);
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
        /**新增表格字段 */
        *create({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(createColumn, payload);
                if (!code) {
                    const params = yield select(state => state.table.params);
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

        /**修改表格字段 */
        *update({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(updateColumn, payload);
                if (!code) {
                    const params = yield select(state => state.table.params);
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


        /**删除表格字段 */
        *delete({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(deleteColumn, payload);
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