import { request } from "@/utils/service"

/** 获取登录验证码 */
export function getTestApi() {
  return request({
    url: "api/test",
    method: "get"
  })
}