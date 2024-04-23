import type { AxiosRequestConfig } from 'axios'
import type {
  Banner,
  CartoonDetail,
  CartoonItem,
  ChapterInfo,
  CollaborateItem,
  CreateCartoon,
  CreateChapter,
  CreateCollaborateReq,
  CreatePaper,
  PageInfo,
  PaperDetail,
  RawPad,
  TempImg,
  UpdatePad,
} from '../types'
import { useGet, usePost } from './base'
import { baseUrlApi } from './utils.ts'

export function activeBannerList() {
  return useGet<Banner[], Banner[] >(baseUrlApi('product-service/api/v1/banner/list'))
}

export function cartoonList(pageIndex: number, pageSize: number) {
  return useGet<any, PageInfo >(baseUrlApi(`product-service/api/v1/cartoon/list/price/${pageIndex}/${pageSize}`))
}

export function getCartoonListByTag(tag: string) {
  return useGet<any, CartoonItem[] >(baseUrlApi(`product-service/api/v1/cartoon/cartoonListByTag/${tag}`))
}

// 获取漫画数据详情，包含漫画信息和章节信息
export function fetchCartoonDetail(id: string) {
  return useGet<any, CartoonDetail >(baseUrlApi(`product-service/api/v1/cartoon/cartoonInfo/${id}`))
}

// 创建新的章节
export function createNewChapter(data: CreateChapter) {
  return usePost(baseUrlApi(`product-service/api/v1/chapter/createChapter`), {
    data,
  })
}

// 根据漫画id获取章节列表
export function fetchChapterList(cartoonId: string) {
  return useGet<any, ChapterInfo[]>(baseUrlApi(`product-service/api/v1/cartoon/chapterList/${cartoonId}`))
}

// 获取全部的章节列表，包含完成的和未完成的
export function fetchFinishedPaperDetail(id: string) {
  return useGet<any, PaperDetail[]>(baseUrlApi(`product-service/api/v1/paper/finishList/${id}`))
}

// 获取全部的章节列表，包含完成的和未完成的
export function fetchAllPaperDetail(id: string) {
  return useGet<any, PaperDetail[]>(baseUrlApi(`product-service/api/v1/paper/list/${id}`))
}

export function createRawPad(paperId: string) {
  return usePost<any, any>(baseUrlApi(`product-service/api/v1/rawPad/createRawPad`), {
    paperId,
  })
}

// 创建paper的时候，默认创建一个对应的raw
export function createPaper(data: CreatePaper) {
  return usePost<any, any>(baseUrlApi(`product-service/api/v1/paper/createPaper`), data)
}

// 本人创建的
export function fetchMyCreate() {
  return useGet<any, CartoonItem[]>(baseUrlApi(`product-service/api/v1/cartoon/meCreate`))
}

export function fetchMyJoin() {
  return useGet<any, CartoonItem[]>(baseUrlApi(`product-service/api/v1/cartoon/meJoin`))
}

export function createPad(name: string) {
  return useGet<any, any >(baseUrlApi(`product-service/api/v1/rawPad/create/${name}`))
}

export function getPadList(chapterId: string) {
  return useGet<any, RawPad[]>(baseUrlApi(`product-service/api/v1/rawPad/workRawPad/${chapterId}`))
}

export function updatePad(data: UpdatePad) {
  return usePost<any, RawPad >(
    baseUrlApi(`product-service/api/v1/rawPad/update`),
    data,
  )
}

// 上传临时paper，需要经过审核才行
export function fetchUploadPaperTemp(data: FormData) {
  return usePost<any, any >(
    baseUrlApi(`product-service/api/v1/collaborate/uploadPaperTemp`),
    data,
    {
      'Content-Type': 'multipart/form-data',
    } as AxiosRequestConfig,
  )
}

// 获取我上传的
export function fetchMeUploadPaperTemp() {
  return useGet<any, TempImg[]>(baseUrlApi(`product-service/api/v1/collaborate/meCreateTemp`))
}

// 创建 collaborate 让漫画作者管理员审核
export function fetchCreateCollaborate(data: CreateCollaborateReq) {
  return usePost<any, any>(baseUrlApi(`product-service/api/v1/collaborate/toCollaborate`), data)
}

// 需要审核的collaborate列表
export function fetchNeedCheckCollaborate(cartoonId: string) {
  return useGet<any, CollaborateItem[]>(baseUrlApi(`product-service/api/v1/collaborate/collaborateList/${cartoonId}`))
}

export function fetchPassCollaborate(collaborateId: string) {
  return usePost<any, any>(baseUrlApi(`product-service/api/v1/collaborate/toPaper/${collaborateId}`))
}

export function fetchCreateCartoon({ title, introduction, price, tags }: CreateCartoon) {
  return usePost<any, any>(
    baseUrlApi('product-service/api/v1/cartoon/createCartoon'),
    {
      title,
      introduction,
      price,
      tags,
    } as CreateCartoon,
  )
}
