// import service from '@/utils/request';
import axios from 'axios';
// 创建 Axios 实例
const service = axios.create({
  // baseURL: '/api', // 请求地址
  // timeout: 20000, // 请求超时时间，单位：毫秒
});

// key = 'msy_1nptHfPSX74UiF5sHM65Z8hAXNoDpRfaTYje';
export const createModel = (payload) => {
  return service.post('/get-model', {
    key: 'msy_1nptHfPSX74UiF5sHM65Z8hAXNoDpRfaTYje',
    payload: payload,
  });
};
// // 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     // 在请求发送之前做些什么
//     // 比如添加 token 等
//     return config;
//   },
//   (error) => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );
// // 响应拦截器
// service.interceptors.response.use(
//   (response) => {
//     // 对响应数据做点什么
//     return response;
//   },
//   (error) => {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );

// 测试ID:
// '018ec1b3-3880-7b62-8edc-5fa1f92b1dc8'
// '018ec1f7-66ad-7b64-b38c-11ff1ea7d00c'

// 测试API Key:
// API密钥:msy_1nptHfPSX74UiF5sHM65Z8hAXNoDpRfaTYje

// const headers = { Authorization: `Bearer ${APIKey}` };

/*
Create a Text to 3D Preview Task~
'/v2/text-to-3d/',
Retrieve a Text to 3D Task
'/v2/text-to-3d',
*/

/*
axios.post('https://api.meshy.ai/v2/text-to-3d', data, {
  headers: {
    'Authorization': `Bearer ${YOUR_API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});
*/
