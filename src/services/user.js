import request from '../utils/request'

/**用户登录 */
export async function login(params) {
    return await request.post('/core/user/login', params);
}

/**获取用菜单 */
export async function getMenus() {
    return await request.get('/core/user/menus');
}

/**获取用户列表 */
export async function getUserList(params) {
    return await request.get('/core/user/list', params)
}

/**获取当前用户 */
export async function getCurrentUser(){
    return await request.get('/core/user/current')
}