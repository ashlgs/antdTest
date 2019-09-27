import {notification, message} from 'antd';
import router from 'umi/router';
import axios from 'axios';
import qs from 'qs';
import {isAntdPro} from './utils';
import store from 'storejs';
import {BASE_URL} from '@/configurations';
import {NOT_LOGIN} from '@/constants';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

axios.interceptors.response.use(
  function (response) {
    let token = response.headers['_x-access-token'];
    if (token) {
      store.remove('token');
      store('token', token);
      // removeItem('token');
      // setItem('token', token);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const checkStatus = (response) => {
  console.log('check',response)
  // 未登录
  if (response.retCode === NOT_LOGIN || response.status === 401) {
    message.destroy();
    message.error('您还没有登录或登录信息已失效，请先登录');
    router.push('/user/login');
  }
  // 请求成功
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // 请求失败
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: `错误代码：${errortext}`,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

export default function request(url, option) {
  console.log('url',url)
  console.log(option)
  // 未登录
  if ((!store('token')) && (url !== '/admin/login')) {
    message.destroy();
    message.error('您还没有登录或登录信息已失效，请先登录');
    router.push('/user/login');
    window.preventDefault();
  }

  const options = {
    expirys: isAntdPro(),
    ...option,
  };

  const defaultOptions = {
    credentials: 'include',
    withCredentials: true,
    headers: {
      Authorization: store('token') ? 'Bearer' + store('token') : '',

    },
  };

  const newOptions = {...defaultOptions, ...options};
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'GET'
  ) {
    newOptions.headers = {
      ...newOptions.headers,
    };
    if(option.contentType){
      newOptions.headers["Content-Type"] = 'application/json;charset=UTF-8'
    }else{
      newOptions.data = qs.stringify(newOptions.body || newOptions.data, {
        allowDots: true,
      });
    }
  }

  if (newOptions.method === 'DELETE') {
    newOptions.headers ={
      ...newOptions.headers,
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  console.log('newOptions**:',newOptions)

  return (
    axios(BASE_URL + url, newOptions)
      .then(checkStatus)
      // .then(response => cachedSave(response, hashcode))
      .then(response => {
        if (newOptions.method === 'DELETE' || response.status === 204) {
          return response.data;
        }
        return response.data;
      })
      .catch(e => {
        if (!e.response) {
          const errortext = 504;
          notification.error({
            message: '请求错误：网络连接超时',
            description: `错误代码：${errortext}`,
          });
          throw new Error(errortext);
        }
        const status = e.response.status;
        if (status === 401) {
          window.g_app._store.dispatch({
            type: 'login/logout',
          });
          return;
        }
        // environment should not be used
        if (status === 403) {
          router.push('/exception/403');
          return;
        }
        if (status <= 504 && status >= 500) {
          router.push('/exception/500');
          return;
        }
        if (status >= 404 && status < 422) {
          router.push('/exception/404');
        }
      })
  );
}
