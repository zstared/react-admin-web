import axios from 'axios';
import router from 'umi/router';
import {
    getLocale
} from 'umi/locale';
import qs from 'querystring';
import {
    message
} from 'antd';
class Request {
    constructor() {
        this.instance = axios.create({
            baseURL: process.env.API_URL,
            timeout: 60000,
            headers: {
                'content-type': 'application/json'
            }
        })

        //请求拦截
        this.instance.interceptors.request.use(config => {
            config.headers.common['token'] = localStorage.getItem('token');
            config.headers.common['language'] = getLocale();
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
                        case 1000001:
                            router.push('/login')
                            break;
                        case 1000002:
                            message.error(data.message);
                            router.push('/login')
                            break;
                        default:
                            message.error(data.message);
                            break;
                    }
                    resolve(data);
                } else {
                    reject()
                }
            })
        }, error => {
            message.error(error.message)
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
     * @param {Object} data? 
     * @param {Object} config? 
     */
    async delete(url, data, config) {
        return await this.instance.delete(url, { data: data })
    }

    /**
     * download 下载
     * @param {string} path 接口路径
     * @param {string|array} code 文件唯一编号/编号集
     * @param {stirng} name 下载文件名称
     */
    async download(path, code, name = '', is_package = false) {
        let url;
        if (!is_package) {
            url = `${process.env.API_URL}${path}?code=${code}&token=${localStorage.getItem('token')}&name=${name}`
        } else {
            url = `${process.env.API_URL}${path}?code=${code.join(',')}&token=${localStorage.getItem('token')}&name=${name}`
        }
        window.open(url, 'download');
    }
}
export default new Request();