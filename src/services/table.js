import request from '../utils/request';

/**获取表格列表 */
export async function getList(params) {
    return await request.get('/core/table/list', params);
}

/**获取表格字段列表 */
export async function getTableAndColumns(params) {
    return await request.get('/core/table/columns', params);
}

/**获取表格字段列表 */
export async function getTableColumns(params) {
    return await request.get('/core/table/tableColumns', params);
}

/**创建表格字段 */
export async function createColumn(params) {
    return await request.post('/core/table/createColumn', params);
}

/**修改表格字段 */
export async function updateColumn(params) {
    return await request.post('/core/table/updateColumn', params);
}

/**删除表格字段 */
export async function deleteColumn(params) {
    return await request.post('/core/table/deleteColumn', params);
}

/**表格字段排序 */
export async function sortColum(params) {
    return await request.post('/core/table/sortColum', params);
}
