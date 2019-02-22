import { getUserList, create, update, updateState, deleteUser } from '@/services/user'
import { message as msg } from 'antd'
export default {
    namespace: 'user',
    state: {
        data: [],
        params: {}
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
            } catch{
                console.log(e)
            }
        },
        /**新增用户 */
        *create({ payload }, { call, put, select }) {
            try {
                const { code } = yield call(create, payload);
                if (!code) {
                    const params = yield select(state => state.user.params);
                    yield put({
                        type: 'getList',
                        payload: params,
                    })
                }
            } catch{
                console.log(e)
            } aa
        },

        /**修改用户 */
        *update({ payload }, { call, put }) {
            try {
                const { code } = yield call(update, payload);
                if (!code) {
                    const params = yield select(state => state.user.params);
                    yield put({
                        type: 'getList',
                        payload: params,
                    })
                }
            } catch{
                console.log(e)
            }
        },

        /**禁用、启用用户 */
        *updateState({ payload }, { call, put, select }) {
            try {
                const { code, message } = yield call(updateState, payload);
                if (!code) {
                    let { data, params } = yield select(state => state.user)
                    let index = data.rows.findIndex((item) => {
                        return item.user_id == payload.user_id
                    });
                    data.rows[index].state = payload.state;
                    yield put({
                        type: 'setData',
                        payload: { data: data, params: params }
                    })
                    msg.success(!payload.state ? '已启用' : '已禁用')
                }
            } catch{
                console.log(e)
            }
        },

        /**删除用户 */
        *delete({ payload }, { call, put, select }) {
            try {
                const { code } = yield call(deleteUser, payload);
                if (!code) {
                    let { data, params } = yield select(state => state.user)
                    let index = data.rows.findIndex((item) => {
                        return item.user_id == payload.user_id
                    });
                    data.rows[index].state = 2;
                    yield put({
                        type: 'setData',
                        payload: { data: data, params: params }
                    })
                    msg.success('已删除')
                }
            } catch{
                console.log(e)
            }
        }
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