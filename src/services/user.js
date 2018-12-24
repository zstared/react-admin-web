import request from '../utils/request'

/**用户登录 */
export async function login(params){
    return await request.post('/core/user/login',params);
}

/**获取用菜单 */
export async function getMenus(){
   return await request.get('/core/user/menus');
}