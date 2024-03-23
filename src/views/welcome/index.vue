<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { activeBannerList, cartoonList } from '../../api/cartoon.ts'
import type { Banner, CartoonItem, PageInfo } from '../../types'

defineOptions({
  name: 'HomeView',
})

const bannerList = ref([] as Banner[])
const router = useRouter()
const route = useRoute()
const pageInfo = ref({} as PageInfo)
const cartoonContent = ref([] as CartoonItem[])

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
onMounted(() => {
  loadBannerList()
  loadSomeCartoonList()
})
</script>

<template>
  <div>
    <div>
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.coverUrl" style="width: 500px;height: 300px" alt="">
        </el-carousel-item>
      </el-carousel>
      <div>
        <div v-for="item in cartoonContent" :key="item.id" @click="cartoonDetail(item)">
          {{ item.title }}
          <img :src="item.coverUrl" style="width: 90px;height: 120px" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
