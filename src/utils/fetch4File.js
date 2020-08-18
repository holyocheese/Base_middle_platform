import axios from 'axios';
import constant from 'utils/constant';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from '../store';
import {
  getToken
} from 'utils/auth';

// 创建 axios 实例
const service = axios.create({
  //baseURL: store.base_url, // api的base_url
  timeout: 45000  // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers.Authorization = getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  // 如果有配置不同的customUrl
  // 测试库默认使用网关地址
  if (config.customUrl) {
    config.url = process.env.BASE_API_INTERFACE + config.url;
  } else {
    config.url = process.env.BASE_API + config.url;
  }
  if (config.isUpload) {
    console.log('headers', config.headers);
    config.headers.post = {
      'Content-Type': 'multipart/form-data',  // 之前说的以表单传数据的格式来传递 form data
    }
    // config.headers = {
    //   'Content-Type': 'multipart/form-data'  // 之前说的以表单传数据的格式来传递 form data
    // }
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过 response 自定义 code 来标示请求状态，当 code 返回如下情况为权限有问题，登出并返回到登录页
     * 如通过 xml http request 状态码标识 逻辑可写在下面 error 中
     */
    console.log(response);
    return response;
  },
  error => {
    // console.log(error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    // request was made and server responsed with a non 2xx status code
    if (error.response) {
      console.error('Invalid status code:',
        error.response.status, '\n', 'response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Client Error', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Client Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default service;
