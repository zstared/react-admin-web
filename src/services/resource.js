import request from '../utils/request'

/**获取资源列表 */
export async function getResourceList(params) {
    return await request.get('/core/resource/treeList', params)
}

/**获取资源下拉列表 */
export async function getResourceDropList(params) {
    return await request.get('/core/resource/treeDropList', params)
}

/**获取权限资源列表 */
export async function getPermissionList() {
    return await request.get('/core/resource/treePermissionList')
}


/**新增资源 */
export async function create(params) {
    return await request.post('/core/resource/create', params)
}

/**编辑资源 */
export async function update(params) {
    return await request.post('/core/resource/update', params)
}

/**删除资源 */
export async function deleteResource(params) {
    return await request.post('/core/resource/delete', params)
}

/**判断资源名称是否存在 */
export async function existResource(params) {
    return await request.post('/core/resource/existResource', params)
}

/**判断资源编码是否存在 */
export async function existResourceCode(params) {
    return await request.post('/core/resource/existResourceCode', params)
}
