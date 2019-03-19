import { getResourceList, create, update, deleteResource,getResourceDropList } from '@/services/resource'

const expandedKeys=[];
const getExpandKey=(tree)=>{
    tree.map(item=>{
        if(item.resource_type==1) expandedKeys.push(item.key);
        if(item.children&&item.children.length>0){
            getExpandKey(item.children)
        }
    })
}

export default {
    namespace: 'resource',
    state: {
        data: [],
        expandedKeys:[],
        params: {},
        dropList:[]
    },
    effects: {
        /**获取资源列表 */
        *getList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getResourceList, payload);
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
        /**获取资源下拉列表 */
        *getDropList({ payload }, { call, put }) {
            try {
                const { code, data } = yield call(getResourceDropList, payload);
                if (!code) {
                    yield put({
                        type: 'setDropList',
                        payload: { data: data, params: payload }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        /**新增资源 */
        *create({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(create, payload);
                if (!code) {
                    const params = yield select(state => state.resource.params);
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

        /**修改资源 */
        *update({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(update, payload);
                if (!code) {
                    const params = yield select(state => state.resource.params);
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

        /**删除资源 */
        *delete({ payload, callback }, { call, put, select }) {
            try {
                const { code } = yield call(deleteResource, payload);
                if (!code) {
                    const params = yield select(state => state.resource.params);
                    yield put({
                        type: 'getList',
                        payload: params,
                    })
                    if (callback) callback()
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    reducers: {
        /**设置列表数据 */
        setData(state, { payload }) {
            getExpandKey(payload.data)
            return {
                ...state,
                data: payload.data,
                expandedKeys:expandedKeys,
                params: { ...payload.params }
            }
        },
        /**设置下拉列表数据 */
        setDropList(state,{payload}){
            return {
                ...state,
                dropList:payload.data
            }
        }
    }
}