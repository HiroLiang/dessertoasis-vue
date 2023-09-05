import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
});
request.defaults.withCredentials = true
request.interceptors.request.use((config) => {
    return config;
});

request.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(new Error('faile' + error))
})

export default request;