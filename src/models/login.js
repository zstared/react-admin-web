
import { login } from '../services/user';
import router from 'umi/router';
import { encryptData } from '../utils/utils'

export default {
    namespace: 'login',
    state: {
        status: ''
    },
    effects: {
        //登录
        *login({ payload }, { call, put }) {
            try {
                const response = yield call(login, payload);
                const { code, data: { token } } = response;
                if (!code) {
                    localStorage.setItem('token', token);
                    router.push('/');
                    //记住密码
                    const { user_name, password, remember } = payload;
                    localStorage.setItem('user_name', remember ? user_name : '');
                    localStorage.setItem('password', remember ? encryptData(password, 'zhengxinhong') : '')
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    reducers: {

    }
}