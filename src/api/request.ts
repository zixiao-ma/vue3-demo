import axios, {AxiosInstance} from 'axios';
import { message } from 'ant-design-vue';
import Nprogress from './nprogress';
import store from "@/store";

const instance = axios.create({
    baseURL:"https://admin-api.macrozheng.com/",
    timeout: 6000
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Nprogress.start()
    config.headers!.Authorization = store.getters.getToken
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Nprogress.done()
    const {data, data: {message, code}} = response

   if (code === 200 || code === 201) {
        return data.data
    } else {
        message.error(message).then(()=>{
            return Promise.reject(message)
        })

    }

}, function (error) {
    // 对响应错误做点什么
    const msg:string = error.toString();
    if(msg.includes('NetWorke error')){
        message.error('网络错误！请检查您的网络').then(()=>{
            return Promise.reject(error)
        })
    }
    if(msg.includes('Timeout')){
        message.error('请求超时！请检查您的网络').then(()=>{
            return Promise.reject(error)
        })
    }
    const {status} = error.response;
    switch (status) {
        case 401:
            message.error('没有提供认证信息').then(()=>{
                return Promise.reject(error);
            })
            break;
        case 500:
            message.error('服务器错误').then(()=>{
                return Promise.reject(error);
            })
            break;
        case 503:
            message.error('服务暂时不可用').then(()=>{
                return Promise.reject(error);
            })
            break;
        case 408:
            message.error('客户端请求超时').then(()=>{
                return Promise.reject(error);
            })
            break;
    }

});
export default instance
