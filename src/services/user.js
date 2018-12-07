import request from '../utils/request'

/**用户登录 */
export async function login(params){
    return await request.post('/core/user/login',params);
}