import type { IAuth, ILoginInfo } from '../types'
import { usePost } from './base'
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
