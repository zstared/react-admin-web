import request from '../utils/request'


/**获取表格列表 */
export async function getColumns(params) {
    return await request.get('/core/table/columns', params)
}