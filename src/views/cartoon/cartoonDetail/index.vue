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
    <div>
      <div>
        {{ cartoonInfo?.title }}
      </div>
      <div>
        <img :src="cartoonInfo?.coverUrl" width="100px">
      </div>
      <div>
        <div v-for="tag in cartoonInfo?.tags" :key="tag">
          {{ tag }}
        </div>
      </div>
      <div>
        {{ cartoonInfo?.introduction }}
      </div>
      <div>
        {{ cartoonInfo?.status }}
      </div>
      <div>
        {{ `参与者 ${cartoonInfo?.partners}` }}
      </div>

      <div>
        {{ `最后更新时间 ${cartoonInfo?.lastUpdateTime}` }}
      </div>
      <div>
        {{ `单集价格 ${cartoonInfo?.price}` }}
      </div>
      <div>
        {{ `销量 ${cartoonInfo?.salesNum}` }}
      </div>
    </div>
    <div>
      <div v-for="item in chapterList" :key="item.id">
        <div @click="jumpChapterDetail(item)">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
