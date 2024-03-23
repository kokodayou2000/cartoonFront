export interface AjaxResult<T = any> {
  code: number
  data?: T
  msg: string
}
