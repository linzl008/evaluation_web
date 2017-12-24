import axios from 'axios';
import Vue from 'vue'
function setting(router){
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        // if (sessionStorage.token) {
        //     // axios.defaults.headers.common.token = localStorage.getItem('token');
        //     // config.headers.token = sessionStorage.getItem('token')
        // }
        // if (localStorage.token) {
        //     // axios.defaults.headers.common.token = localStorage.getItem('token');
        //     config.headers.token = localStorage.getItem('token')
        // }
        // axios.defaults.headers.common['Authorization'] = sessionStorage.token;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    axios.interceptors.response.use((response) => {
        if (response.status !== 200) {
            console.log('!200')
        }
       if(response.data.retcode === "0004"){ //登录超时
           localStorage.user = '';
           Vue.prototype.$message({
               type: 'error',
               message: '登录超时咯'
           })
           router.push({path:'/'})
       }
        return response
    }, (error) => {
        if (error.response.status === 403) {
            Vue.prototype.$message({
                type: 'error',
                message: '登录超时咯'
            })

            localStorage.user = ''
            router.push({path:'/'})
        }
        return Promise.reject(error)
    })
// Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response.data;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });
}

export default {
    baseUrl: '/evaluation',
    axios,
    setting
}
