import { getUserList } from '@/services/user'
export default {
    namespace: 'system',
    state: {
        list: []
    },
    effects: {
        *getList({ payload }, { call, put }) {
            try {
                const { data: data } = yield call(getUserList);
                yield put({
                    type: 'list',
                    payload: data
                })
            } catch{
                console.log(e)
            }
        }
    },
    reducers: {
        list(state, { payload }) {
            return {
                ...state,
                list: payload
            }
        }
    }
}