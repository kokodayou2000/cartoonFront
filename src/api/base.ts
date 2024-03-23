import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useLocalStorage } from '../use/useLocalStorage.ts'

// const OMEN = 'http://10.12.0.143:8080'
// const LOCAL = 'http://127.0.0.1:8080'
export const instance = axios.create({
  // baseURL: OMEN,
  timeout: 10000,
})

async function requestHandler(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  const { value: token } = useLocalStorage('token', '')
  if (config.headers && token.value)
    config.headers.token = token.value
  return config
}

export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

function responseHandler(response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
  return response.data
}

function errorHandler(error: AxiosError): Promise<any> {
  return Promise.reject(error)
}

instance.interceptors.request.use(requestHandler, errorHandler)

instance.interceptors.response.use(responseHandler, errorHandler)

export function useGet<T = any, R = any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
  return instance.request({
    url,
    params,
    method: 'GET',
    ...config,
  })
}

export function usePost<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
  return instance.request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}

export function usePut<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
  return instance.request({
    url,
    data,
    method: 'PUT',
    ...config,
  })
}

export function useDelete<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> {
  return instance.request({
    url,
    data,
    method: 'DELETE',
    ...config,
  })
}
