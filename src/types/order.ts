export interface IChargeDO {
  id: string
  info: string
  money: number
  point: number
}

export interface IChargeReq {
  chargeId: string
  clientType: string
}
