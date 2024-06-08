import axios from 'axios';

// 创建 Axios 实例
const service = axios.create({
  baseURL: '/api', // 设置统一的请求前缀
  timeout: 10000, // 请求超时时间，单位：毫秒
});
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做些什么
    // 比如添加 token 等
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// 然后导出
export default service;
