import { getFaceList, getTypeList, create, update, deleteFace } from '@/services/face'
export default {
    namespace: 'face',
    state: {
        data: [],
        params: {},
        faceList: [],
        permission: {},
        typeData: []
    },
    effects: {
        /**获取人脸列表 */
        * getList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getFaceList, payload);
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
        /**获取人脸库类型列表 */
        * getTypeList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getTypeList, payload);
                if (!code) {
                    yield put({
                        type: 'setTypeData',
                        payload: { data: data }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        /**新增人脸 */
        * create({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(create, payload);
                if (!code) {
                    const params = yield select(state => state.face.params);
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

        /**修改人脸 */
        * update({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(update, payload);
                if (!code) {
                    const params = yield select(state => state.face.params);
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

        /**删除人脸 */
        * delete({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(deleteFace, payload);
                if (!code) {
                    const params = yield select(state => state.face.params);
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
        /**设置类型列表数据 */
        setTypeData(state, { payload }) {
            return {
                ...state,
                typeData: [...payload.data],
            }
        },
    }
}