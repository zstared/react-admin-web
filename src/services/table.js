import request from '../utils/request'


/**获取表格列表 */
export async function columns(params) {
    return await request.get('/core/table/columns', params)
}