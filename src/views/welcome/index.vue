<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
import { activeBannerList, cartoonList, getCartoonListByTag } from '../../api/cartoon.ts'
import type { Banner, CartoonItem, PageInfo } from '../../types'

defineOptions({
  name: 'HomeView',
})

const bannerList = ref([] as Banner[])
const router = useRouter()
const pageInfo = ref({} as PageInfo)
const cartoonContent = ref([] as CartoonItem[])
const tags = ref(['热血', '青春', '校园', '战斗'])
// 加载bannerList
function loadBannerList() {
  activeBannerList().then((res) => {
    if (res.code === 200) {
      if (res.data !== undefined)
        bannerList.value = res.data
    }
  })
}
// 加载bannerList
function loadSomeCartoonList() {
  cartoonList(0, 10).then((res) => {
    if (res.code === 200) {
      if (res.data !== undefined) {
        pageInfo.value = res.data
        cartoonContent.value = pageInfo.value.content
      }
    }
  })
}
function cartoonDetail(item: CartoonItem) {
  router.push({
    path: '/cartoonDetail',
    query: {
      id: item.id,
    },
  })
}
function selectTag(tag: string) {
  getCartoonListByTag(tag).then((res) => {
    if (res.code === 200) {
      if (res.data !== undefined)
        cartoonContent.value = res.data
    }
  })
}
onMounted(() => {
  loadBannerList()
  loadSomeCartoonList()
})
</script>

<template>
  <div>
    <div>
      <!-- 居中 -->
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="item in bannerList" :key="item.id" interval="5000">
          <img :src="item.coverUrl" style="width: 500px;height: 300px" alt="">
        </el-carousel-item>
      </el-carousel>
      <div class="mt-4 h-10 bg-gray-100 flex justify-center items-center font-black">
        <div v-for="tag in tags" :key="tag" class="grid grid-cols-6">
          <div @click="selectTag(tag)">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="flex gap-16 mt-4">
        <div v-for="item in cartoonContent" :key="item.id" @click="cartoonDetail(item)">
          <div class="border-4 shadow-lg">
            {{ item.title }}
            <img :src="item.coverUrl" style="width: 90px;height: 120px" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
