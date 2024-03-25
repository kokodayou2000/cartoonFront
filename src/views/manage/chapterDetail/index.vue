<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { createPaper, createRawPad, fetchAllPaperDetail } from '../../../api/cartoon.ts'
import type { CreatePaper, PaperDetail } from '../../../types'

defineOptions({
  name: 'ManageChapterDetail',
})
const route = useRoute()
const router = useRouter()

// 新增章节，发生当前用户
function addChapterPage(item: PaperDetail) {
  // 默认这个已经创建了 paper 和 rawPad
  createRawPad(item.id).then((res) => {
    console.log(res)
    router.push({
      path: '/workbench',
      query: {
        paperId: item.id,
      },
    })
  })
}
const paperDetailList = ref([] as PaperDetail[])
const finishedPaperList = computed(() => {
  return paperDetailList.value.filter((item) => {
    return item.status === 'FINISH'
  })
})

const doingPaperList = computed(() => {
  return paperDetailList.value.filter((item) => {
    return item.status === 'DOING'
  })
})
const createPaperState = reactive({
  chapterId: route.query.id,
  num: 0,
  info: '',
} as CreatePaper)
const createPaperDialog = ref(false)
function addNewPaper() {
  // TODO 获取最新的Num
  createPaper(createPaperState).then((res) => {
    console.log(res)
  })
}
onBeforeMount(() => {
  // 获取全部的
  if (route.query.id && typeof route.query.id == 'string') {
    fetchAllPaperDetail(route.query.id).then((res) => {
      paperDetailList.value = res.data as PaperDetail[]
    })
  }
})
</script>

<template>
  <div>
    <el-dialog
      v-model="createPaperDialog"
      title="Tips"
      width="500"
    >
      <el-input-number v-model="createPaperState.num" />
      <el-input v-model="createPaperState.info" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="createPaperDialog = false">
            取消
          </el-button>
          <el-button type="primary" @click="addNewPaper"></el-button>
        </div>
      </template>
    </el-dialog>
    <div>
    <!--  TODO 获取当前章节参与者    -->
    </div>
    <div>
      <!--  TODO 从漫画参与者中选取章节参与者 -->
      新增章节参与者
    </div>
    <div>
      <div v-for="item in finishedPaperList" :key="item.id">
        <img :src="item?.url" width="300px">
      </div>
      <div v-for="item in doingPaperList" :key="item.id" class="border-2" style="width: 300px;height: 600px" @click="addChapterPage(item)">
        创作
        {{ item.info }}
      </div>
      <div @click="createPaperDialog = true">
        新增
      </div>
    </div>
  </div>
</template>
