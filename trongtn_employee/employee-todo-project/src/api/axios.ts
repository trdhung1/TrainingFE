import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;