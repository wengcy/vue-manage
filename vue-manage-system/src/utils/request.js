import axios from 'axios';
import config from '@/config/index'
import that  from '@/main'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    //baseURL: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
    timeout: 6000
    //headers:{'Content-Type': 'application/x-www-form-urlencoded'}
})

service.interceptors.request.use( config => {
    return config;
}, error => {
    console.log(error);
    that.$message.error('请求错误');
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if(response.status === 200){
        return response.data;
    }else{
        that.$message.error('业务错误');
        Promise.reject();

    }
}, error => {
  
    console.log(error);
    that.$message.error('响应错误');
    return Promise.reject();
})

export default service;