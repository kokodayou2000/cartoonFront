import type {
  Banner,
  CartoonDetail,
  CartoonItem,
  PageInfo,
  PaperDetail,
  RawPad,
  UpdatePad,
} from '../types'
import { useGet, usePost } from './base'
import { baseUrlApi } from './utils.ts'
import {CreatePaper} from "../types";

export function activeBannerList() {
  return useGet<Banner[], Banner[] >(baseUrlApi('product-service/api/v1/banner/list'))
}

export function cartoonList(pageIndex: number, pageSize: number) {
  return useGet<any, PageInfo >(baseUrlApi(`product-service/api/v1/cartoon/list/price/${pageIndex}/${pageSize}`))
}
// 获取漫画数据详情
export function fetchCartoonDetail(id: string) {
  return useGet<any, CartoonDetail >(baseUrlApi(`product-service/api/v1/cartoon/cartoonInfo/${id}`))
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
  return usePost<any, any>(baseUrlApi(`product-service/api/v1/paper/createPaper`), {
    data,
  })
}

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
