<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import type { PaperDetail } from '../../../types'
import { fetchFinishedPaperDetail } from '../../../api/cartoon.ts'

defineOptions({
  name: 'ChapterDetail',
})
const route = useRoute()
const chapterDetailList = ref([] as PaperDetail[])
onBeforeMount(() => {
  if (route.query.id && typeof route.query.id == 'string') {
    fetchFinishedPaperDetail(route.query.id).then((res) => {
      const resData = res.data as PaperDetail[]
      chapterDetailList.value = resData
    })
  }
})
</script>

<template>
  <div>
    <div>
      <div v-for="item in chapterDetailList" :key="item.id">
        <img :src="item?.url" width="300px">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
