import axios from "axios"
import { get } from "lodash-es";
import { Toast } from 'vant';

let loadingCount = 0;
const startLoading = () => {
  loadingCount++;
  // console.log(`output->startLoading`,loadingCount)
  if(loadingCount === 1) {
    Toast.loading({
      duration: 0,
      message: '请求中...',
      forbidClick: true,
    });
  }
}

const endLoading = () => {
  loadingCount--;
  // console.log(`output->endLoading`,loadingCount)
  if(loadingCount === 0) {
    Toast.clear();
  }
}


/** 创建请求实例 */
function createService(axiosConfig, customOptions = Object.assign({
  loading: false,
  delay: false
})) {
  // 创建一个 Axios 实例
  const service = axios.create(
    // vite-plugin-mock 不支持自定义端口？
    // {
    //   baseURL: 'http://localhost:8888',
    //   timeout: 10000
    // }
    {
      headers: {
        // 携带 Token
        // Authorization: "Bearer " + getToken(),
        "Content-Type": get(axiosConfig, "headers.Content-Type", "application/json")
      },
      timeout: 5000,
      // baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
  )
  const { loading, delay } = customOptions
  console.log(`---------------request----------->${axiosConfig.url.replace(/\/mock/, '')}`)
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {

      loading && startLoading();
      // apiData 是 API 返回的数据
      const apiData = response.data;
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code;
      // 如果没有 Code, 代表这不是项目后端开发的 API
      if (code === undefined) {
        Toast.fail("非本系统的接口");
        return Promise.reject(new Error("非本系统的接口"))
      } else {
        switch (code) {
          case 0:
            // code === 0 代表没有错误
            setTimeout(() => {
              loading && endLoading();
            }, delay ? 150 : 0)
            return apiData
          default:
            // 不是正确的 Code
            Toast.fail(apiData.message || "Error");
            return Promise.reject(new Error("Error"))
        }
      }
    },
    (error) => {
      const status = get(error, "response.status")
      handleHttpErrorStatus(status);
      return Promise.reject(error)
    }
  )
  return service(axiosConfig)
}

const handleHttpErrorStatus = (error) => {
  switch (error) {
    case 400: error.message = "请求错误"; break;
    // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
    // location.reload()
    case 401: error.message = "401"; break;
    case 403: error.message = "拒绝访问"; break;
    case 404: error.message = "请求地址出错"; break;
    case 408: error.message = "请求超时"; break;
    case 500: error.message = "服务器内部错误"; break;
    case 501: error.message = "服务未实现"; break;
    case 502: error.message = "网关错误"; break;
    case 503: error.message = "服务不可用"; break;
    case 504: error.message = "网关超时"; break;
    case 505: error.message = "HTTP 版本不受支持"; break;
    default: break;
  }
  Toast.fail(error.message);
}

export default createService;
