import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 10000,
});

export default instance;

