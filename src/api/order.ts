import type { IChargeDO, IChargeReq } from '../types'

import { useGet, usePost } from './base.ts'
import { baseUrlApi } from './utils.ts'

export function getChargeListApi() {
  return useGet<any, IChargeDO[]>(
    baseUrlApi(`order-service/api/v1/charge/chargeList`),
  )
}

export function chargeApi({ chargeId, clientType }: IChargeReq) {
  return usePost<any, string>(
    baseUrlApi(`order-service/api/v1/order/charge`),
    {
      chargeId,
      clientType,
    },
  )
}

export function getChapterCodeApi() {
  return useGet(
    baseUrlApi('user-service/api/v1/notify/getChapter'),
  )
}
