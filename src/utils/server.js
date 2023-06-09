import axios from "axios";

export const SERVER_BASE_URL = "http://101.200.221.213:9202";

axios.defaults.baseURL = SERVER_BASE_URL;
// 设置默认请求头为存储在浏览器的token
// axios.defaults.headers.common["token"] = sessionStorage.getItem("token");

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        config.headers.token = sessionStorage.getItem("token");
        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

// 只有post请求才会调用该方法
export const POST = (url, params) => {
    return axios.post(url, params).then((res) => res.data);
};
// 封装一个导出接口
export const BLOB = (url, params) => {
    return axios({
        url: url,
        method: "post",
        params: params,
        headers: {
            token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNmFhMGFmOS00NGU4LTQxZWYtOWFkMS1lZjU0ZDE1MjE2ODQiLCJzdWIiOiIyIzE2ODg0NTUwMTgzMzEiLCJpc3MiOiLnmb3mtIvmt4AiLCJpYXQiOjE2ODg0NTUwMTgsImV4cCI6MTY4ODU0MTQxOH0.YjWZLdMgXXUPx5rMHq_y21cVgJHNpEXbIwK2Sp15dWU",
        },
        responseType: "blob",
    }).then((res) => res.data);
};
