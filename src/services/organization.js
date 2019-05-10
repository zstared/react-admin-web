import request from '../utils/request'

/**获取组织列表 */
export async function getOrganizationList(params) {
    return await request.get('/core/organization/treeList', params)
}

/**获取组织下拉列表 */
export async function getOrganizationDropList(params) {
    return await request.get('/core/organization/treeDropList', params)
}

/**获取权限组织列表 */
export async function getPermissionList() {
    return await request.get('/core/organization/treePermissionList')
}


/**新增组织 */
export async function create(params) {
    return await request.post('/core/organization/create', params)
}

/**编辑组织 */
export async function update(params) {
    return await request.post('/core/organization/update', params)
}

/**删除组织 */
export async function deleteOrganization(params) {
    return await request.post('/core/organization/delete', params)
}

/**判断组织名称是否存在 */
export async function existOrganization(params) {
    return await request.post('/core/organization/existOrganization', params)
}

