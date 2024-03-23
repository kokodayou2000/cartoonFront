<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { fetchChapterDetail } from '../../../api/cartoon.ts'
import {CartoonDetail, ChapterDetail} from '../../../types'

defineOptions({
  name: 'ChapterDetail',
})
const route = useRoute()
const chapterDetailList = ref([] as ChapterDetail[])
onBeforeMount(() => {
  if (route.query.id && typeof route.query.id == 'string') {
    fetchChapterDetail(route.query.id).then((res) => {
      const resData = res.data as ChapterDetail[]
      chapterDetailList.value = resData
    })
  }
})
</script>

<template>
  <div>
    <div>
    </div>
    <div>
      <div v-for="item in chapterDetailList" :key="item.id">
        <img :src="item?.url" width="300px" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
