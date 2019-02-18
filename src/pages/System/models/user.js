import { getUserList } from '@/services/user'
export default {
    namespace: 'user',
    state: {
        list: []
    },
    effects: {
        *getList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getUserList,payload);
                if (!code) {
                    yield put({
                        type: 'list',
                        payload: data
                    })
                }
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