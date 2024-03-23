import type { Banner, PageInfo, RawPad, UpdatePad } from '../types'
import { useGet, usePost } from './base'
import { baseUrlApi } from './utils.ts'
import {CartoonDetail, ChapterDetail} from "../types";

export function activeBannerList() {
  return useGet<Banner[], Banner[] >(baseUrlApi('product-service/api/v1/banner/list'))
}

export function cartoonList(pageIndex: number, pageSize: number) {
  return useGet<any, PageInfo >(baseUrlApi(`product-service/api/v1/cartoon/list/price/${pageIndex}/${pageSize}`))
}

export function fetchCartoonDetail(id: string) {
  return useGet<any, CartoonDetail >(baseUrlApi(`product-service/api/v1/cartoon/cartoonInfo/${id}`))
}

export function fetchChapterDetail(id: string) {
  return useGet<any, ChapterDetail[]>(baseUrlApi(`product-service/api/v1/chapter/chapterInfo/${id}`))
}

export function createPad(name: string) {
  return useGet<any, any >(baseUrlApi(`product-service/api/v1/rawPad/create/${name}`))
}

export function getPad(id: string) {
  return useGet<any, RawPad >(baseUrlApi(`product-service/api/v1/rawPad/rawPad/${id}`))
}

export function updatePad(data: UpdatePad) {
  return usePost<any, RawPad >(
    baseUrlApi(`product-service/api/v1/rawPad/update`),
    data,
  )
}

export function getPadList() {
  return useGet<any, RawPad[] >(
    baseUrlApi(`product-service/api/v1/rawPad/list`),
  )
}
