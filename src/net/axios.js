import axios from "axios";
import { Toast } from "vant";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

//http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("Authorization");
    console.log("Authorization："+ token)
    if (token) {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 网络控制
axios.interceptors.response.use(
  (res) => {
    const status = Number(res.status) || 200;
    const message = res.data.msg || "未知错误";

    if (status !== 200 || (res.data.code && Number(res.data.code) !== 200)) {
      Toast(message);
      return Promise.reject(new Error(message));
    }

    return res;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          Toast.fail({
            message: "网络请求不存在",
            duration: 2000,
          });
          break;
          // 其他错误，直接抛出错误提示
        default:
          Toast.fail({
            message: error.response.data.message,
            duration: 2000,
          });
      }
      return Promise.reject(error.response.data); // 返回接口返回的错误信息
    } else if (error.message.includes("timeout")) {
      return Promise.reject(new Error("请求超时"));
    } else {
      Toast.fail("网络异常");
      return Promise.reject(new Error("网络异常"));
    }
  }
);

export default axios;