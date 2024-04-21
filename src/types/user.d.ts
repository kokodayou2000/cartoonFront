export interface IUser {
  id: string
  name: string
  pwd: string
  headImg: string
  points: number
  createTime: Date
  mail: string
  secret: string
}

export interface ILoginInfo {
  mail: string
  pwd: string
}

// 用户信息，相当于 vo 对象了
export interface IUserInfo {
  id: string
  name: string
  headImg: string
  points: number
  mail: string
}

export interface IUserVO {
  id: string
  name: string
  headImg: string
  points: number
  mail: string
}

export interface IAuth {
  userInfo: IUserInfo
  token: stirng
}

export interface IRegister {
  code: string
  head_img: string
  mail: string
  name: string
  pwd: string
}
