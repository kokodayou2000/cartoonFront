import type {IAuth, ILoginInfo, IRegister, IUserInfo} from '../types'

import { useGet, usePost } from './base'
import { baseUrlApi } from './utils.ts'

export function auth({ mail, pwd }: ILoginInfo) {
  return usePost<ILoginInfo, IAuth >(
    baseUrlApi(`user-service/api/v1/user/login`),
    {
      mail,
      pwd,
    },
  )
}

export function userRegisterApi({ code, head_img, mail, name, pwd }: IRegister) {
  return usePost<IRegister, IAuth >(
    baseUrlApi(`user-service/api/v1/user/register`),
    {
      code,
      head_img,
      mail,
      name,
      pwd,
    },
  )
}

export function getChapterApi() {
  return useGet<any, IAuth >(
    baseUrlApi(`user-service/api/v1/notify`),
  )
}

export function sendEmailCaptchaCodeApi(email: string, captcha: string) {
  return useGet(
    baseUrlApi(`user-service/api/v1/notify/sendCode?to=${email}&captcha=${captcha}`),
  )
}

export function userInfoApi(id: string) {
  return useGet<string,IUserInfo>(
    baseUrlApi(`user-service/api/v1/user/info/${id}`),
  )
}
