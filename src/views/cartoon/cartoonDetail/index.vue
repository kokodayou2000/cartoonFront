<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { fetchCartoonDetail } from '../../../api/cartoon.ts'
import type { CartoonDetail, ChapterInfo } from '../../../types'

defineOptions({
  name: 'CartoonDetail',
})
const route = useRoute()
const router = useRouter()
const cartoonDetail = ref({} as CartoonDetail)
const cartoonInfo = computed(() => {
  return cartoonDetail.value.cartoonInfo
})
const chapterList = computed(() => {
  return cartoonDetail.value.chapterList
})
function init() {
  if (route.query.id && typeof route.query.id == 'string') {
    fetchCartoonDetail(route.query.id).then((res) => {
      const resData = res.data as CartoonDetail
      cartoonDetail.value = resData
    })
  }
}
init()
function jumpChapterDetail(chapterInfo: ChapterInfo) {
  router.push({
    path: '/chapterDetail',
    query: {
      id: chapterInfo.id,
    },
  })
}
</script>

<template>
  <div>
    <div class="bg-white p-5 border-4 shadow-lg flex">
      <img :src="cartoonInfo?.coverUrl" width="230px">
      <div class="flex-1 ml-6">
        <div class="text-2xl">
          {{ cartoonInfo?.title }}
        </div>
        <div v-for="tag in cartoonInfo?.tags" :key="tag" class="box-border">
          {{ tag }}
        </div>
        <div class="font-thin">
          {{ cartoonInfo?.introduction }}
        </div>
        <div class="font-thin">
          {{ cartoonInfo?.status }}
        </div>
        <div class="font-thin">
          {{ `参与者 ${cartoonInfo?.partners}` }}
        </div>
        <div class="font-thin">
          {{ `最后更新时间 ${cartoonInfo?.lastUpdateTime}` }}
        </div>
        <div class="font-thin">
          {{ `单集价格 ${cartoonInfo?.price}` }}
        </div>
        <div class="font-thin">
          {{ `销量 ${cartoonInfo?.salesNum}` }}
        </div>
      </div>
    </div>
    <div class="mt-2 flex flex-auto">
      <div v-for="item in chapterList" :key="item.id" class="mr-6 border">
        <div @click="jumpChapterDetail(item)">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comic-tags span {
  display: inline-block;
  background-color: #eee;
  color: #333;
  padding: 4px 8px;
  margin-right: 5px;
  border-radius: 3px;
}

</style>
