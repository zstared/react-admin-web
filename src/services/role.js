import request from '../utils/request'


/**新增角色 */
export async function create(params) {
    return await request.post('/core/role/create', params)
}

/**编辑角色 */
export async function update(params) {
    return await request.post('/core/role/update', params)
}

/**删除角色 */
export async function deleteRole(params) {
    return await request.post('/core/role/delete', params)
}

/**获取角色列表(下拉框) */
export async function getRoleDropList(params) {
    return await request.get('/core/role/list', params);
}

/**获取用户列表 */
export async function getRoleList(params) {
    return await request.get('/core/role/pageList', params)
}