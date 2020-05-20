import Vue from "vue";
import axios from "axios";
import { getToken } from "@/utils/token";

// 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// 允许携带cookies
axios.defaults.withCredentials = true;

// Add a request interceptor
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken()
    if (token) {
        config.headers.token = token
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;
