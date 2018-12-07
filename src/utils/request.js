import axios from 'axios';
import router from 'umi/router';
import {getLocale} from 'umi/locale';
import qs from 'querystring';
import {
    message
} from 'antd';
class Request {
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:8081',
            timeout: 5000,
            headers: {
                'content-type': 'application/json'
            }
        })

        //请求拦截
        this.instance.interceptors.request.use(config => {
            config.headers.common['token'] = localStorage.getItem('token');
            config.headers.common['language']=getLocale();
            return config;
        }, error => {
            return Promise.reject(error);
        })

        //返回拦截
        this.instance.interceptors.response.use(response => {
            return new Promise((resolve, reject) => {
                if (response.status === 200) {
                    const data = response.data;
                    switch (data.code) {
                        case 0:
                            break;
                        case 1001:
                            router.push('/login')
                            break;
                        case 1002:
                            message.error(data.message);
                            router.push('/login')
                            break;
                        default:
                            message.error(data.message);
                            break;
                    }
                    console.log(data, response)
                    resolve(data);
                } else {
                    reject()
                }
            })
        }, error => {
            return Promise.reject(error);
        })
    }

    /**
     * GET请求
     * @param {String} url 
     * @param {Object} data? 
     * @param {Object} config? 
     */
    async get(url, data = {}, config = {}) {
        return await this.instance(`${url}?${qs.stringify(data)}`, config)
    }

    /**
     * POST请求
     * @param {String} url 
     * @param {Object} data? 
     * @param {Object} config? 
     */
    async post(url, data = {}, config = {}) {
        return await this.instance.post(url, data, config)
    }

    /**
     * DELETE请求
     * @param {String} url 
     * @param {Object} data? {id:1} 
     * @param {Object} config? 
     */
    async delete(url, data, config) {
        return await this.instance.delete(url + `/${data.id}`, config)
    }
}
export default new Request();