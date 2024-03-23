<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { fetchChapterDetail } from '../../../api/cartoon.ts'
import type { ChapterDetail } from '../../../types'

defineOptions({
  name: 'ManageChapterDetail',
})
const route = useRoute()
const router = useRouter()
function addChapterPage(index: number) {
  router.push({
    path: '/workbench',
    query: {
      number: index,
    },
  })
}
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
    <!--  TODO 获取当前章节参与者    -->
    </div>
    <div>
      <!--  TODO 从漫画参与者中选取章节参与者 -->
      新增章节参与者
    </div>
    <div>
      <div v-for="item in chapterDetailList" :key="item.id">
        <img :src="item?.url" width="300px">
      </div>
      <!-- TODO 只有未完成的才能新增漫画页     -->
      <div class="border-2" style="width: 300px;height: 600px" @click="addChapterPage(chapterDetailList.length)">
        新增漫画页
      </div>
    </div>
  </div>
</template>
