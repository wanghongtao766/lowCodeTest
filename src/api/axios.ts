import axios, { AxiosResponse, AxiosRequestConfig, Axios, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { RequestHttpHeaderEnum, ResultEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { PageEnum, ErrorPageNameMap } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { redirectErrorPage, getLocalStorage, routerTurnByName, isPreview } from '@/utils'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'

export interface MyResponseType<T> {
  code: ResultEnum
  data: T
  message: string
}

export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const axiosInstance = axios.create({
  baseURL: `${ import.meta.env.VITE_PRO_PATH}`,
  // baseURL: '/',
  timeout: ResultEnum.TIMEOUT
}) as unknown as MyRequestInstance

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // // 白名单校验
    // if (includes(fetchAllowList, config.url)) return config
    // 获取 token
    // const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    // 重新登录
    // if (!info) {
    //   routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //   return config
    // }
    // const userInfo = info[SystemStoreEnum.USER_INFO]
    config.headers['Authorization'] = 'Bearer '+localStorage.getItem('token') || ''
    config.headers['clientid'] = localStorage.getItem('clientid') || ''
    // config.headers[userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token'] =  userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''
    return config
  },
  (err: AxiosError) => {
    Promise.reject(err)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code === 401) {
      window['$message'].error(window['$t']('认证失败! 重定向到登录页'))
      console.log('发送消息给父页面 重定向到登录页');
      window.parent.postMessage({type: 'isRelogin', code: 401 }, '*')
      // console.log(import.meta.env.VITE_APP_LOGIN_PAGE + '?redirect=/projectChart');
      
      // setTimeout(() => {
      //   location.href = import.meta.env.VITE_APP_LOGIN_PAGE + '?redirect=/projectChart';
      // }, 1500);
    }
    return Promise.resolve(res.data)
  },
  //   // 预览页面错误不进行处理
  //   if (isPreview()) {
  //     return Promise.resolve(res.data)
  //   }
  //   const { code } = res.data as { code: number }
  //
  //   if (code === undefined || code === null) return Promise.resolve(res.data)
  //
  //   // 成功
  //   if (code === ResultEnum.SUCCESS) {
  //     return Promise.resolve(res.data)
  //   }
  //
  //   // 登录过期
  //   if (code === ResultEnum.TOKEN_OVERDUE) {
  //     window['$message'].error(window['$t']('http.token_overdue_message'))
  //     routerTurnByName(PageEnum.BASE_LOGIN_NAME)
  //     return Promise.resolve(res.data)
  //   }
  //
  //   // 固定错误码重定向
  //   if (ErrorPageNameMap.get(code)) {
  //     redirectErrorPage(code)
  //     return Promise.resolve(res.data)
  //   }
  //
  //   // 提示错误
  //   window['$message'].error(window['$t']((res.data as any).msg))
  //   return Promise.resolve(res.data)
  // },
  // (err: AxiosError) => {
  //   const status = err.response?.status
  //   console.log(status);
  //   switch (status) {
  //     case 401:
  //       routerTurnByName(PageEnum.BASE_LOGIN_NAME)
  //       Promise.reject(err)
  //       break
  
  //     default:
  //       Promise.reject(err)
  //       break
  //   }
  // }
)

export default axiosInstance
