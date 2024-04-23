export interface Banner {
  id: string
  cartoonId: string
  coverUrl: string
  active: boolean
}

// 这个好像没用用到
export interface ChapterItem {
  id: string
  cartoonId: string
  num: number
  title: string
  status: string
  free: boolean
  info: string
  partners: Set<string>
}

export interface CollaborateItem {
  id: string
  imgUrl: string
  info: string
  cartoonId: string
  cartoonName: string
  patternId: string
  chapterId: string
  chapterName: string
  num: number
  uploadTime: Date
  pass: boolean
  del: boolean
}

export interface PaperItem {
  id: string
  chapterId: string
  num: number
  url: string
  info: string
  createBy: string
}

export interface UpdatePad {
  id: string
  penList: Pen[]
}

export interface RawPad {
  id: string
  paperId: string
  userId: string
  penList: Pen[]
}
export interface Pen {
  color: string
  points: Point[]
}
export interface Point {
  time: number
  x: number
  y: number
}

// 包含漫画信息和章节信息
export interface CartoonDetail {
  cartoonInfo: CartoonItem
  chapterList: ChapterInfo[]
}

// 页面信息，包含图片，info
export interface PaperDetail {
  id: string
  chapterId: string
  num: number
  url: string
  info: string
  status: string
  partners: string[]
  createBy: string
}

export interface TempImg {

  id: string
  // 地址
  imgUrl: string

  // 上传的用户
  userId: string
  // 详情
  info: string
  // 上传时间
  uploadTime: Date
}

export interface CreateCollaborateReq {
  imgUrl: string
  chapterId: string
  chapterName: string
  cartoonId: string
  cartoonName: string
  info: string
  num: number
}

export interface CreateChapter {
  cartoonId: string
  num: number
  free: boolean
  title: string
  info: string
}
// 创建 paper 接口
export interface CreatePaper {
  chapterId: string
  num: number
  info: string
}

export interface ChapterInfo {
  id: string
  cartoonId: string
  num: number
  title: string
  status: string
  free: boolean
  info: any
  partners: string[]
}
export interface PageInfo {
  content: Content[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  sort: Sort2
  number: number
  numberOfElements: number
  size: number
  empty: boolean
}

// export interface CartoonItem {
//   id: string
//   title: string
//   salesNum: number
//   introduction: string
//   coverUrl: string
//   tags: Set<string>
//   status: string
//   price: number
//   partners: Set<string>
//   createBy: string
//   createTime: Date
//   lastUpdateTime: Date
// }

export interface CartoonItem {
  id: string
  title: string
  salesNum: number
  introduction: string
  coverUrl: string
  tags: string[]
  status: string
  price: number
  partners: string[]
  createBy: string
  createTime: string
  lastUpdateTime: string
}

export interface CreateCartoon {
  title: string
  introduction: string
  price: number
  tags: string[]
}

export interface Pageable {
  sort: Sort
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Sort2 {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface CollaborateItem {
  id: string
  imgUrl: string
  info: string
  cartoonId: string
  cartoonName: string
  patternId: string
  chapterId: string
  chapterName: string
  num: number
  uploadTime: string
  pass: boolean
  del: boolean
}
