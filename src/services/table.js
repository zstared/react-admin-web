import request from '../utils/request'

/**获取表格列表 */
export async function getList(params) {
    return await request.get('/core/table/list', params)
}

/**获取表格字段列表 */
export async function getColumns(params) {
    return await request.get('/core/table/columns', params)
}

/**创建表格字段 */
export async function createColumn(params) {
    return await request.post('/core/table/createColumn', params)
}

/**修改表格字段 */
export async function updateColumn(params) {
    return await request.post('/core/table/updateColumn', params)
}

/**删除表格字段 */
export async function deleteColumn(params) {
    return await request.post('/core/table/deleteColumn', params)
}