<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import {
  createPaper,
  createRawPad,
  fetchAllPaperDetail,
  fetchCartoonDetail,
  fetchCreateCollaborate,
  fetchMeUploadPaperTemp,
  fetchMyJoin,
} from '../../../api/cartoon.ts'
import type {
  CartoonItem,
  ChapterInfo,
  CreateCollaborateReq,
  CreatePaper,
  PaperDetail,
  TempImg,
} from '../../../types'

defineOptions({
  name: 'ManageChapterDetail',
})
const route = useRoute()
const router = useRouter()

// 新增章节，发生当前用户
function addChapterPage(item: PaperDetail) {
  // 默认这个已经创建了 paper 和 rawPad
  createRawPad(item.id).then((res) => {
    if (res.code === 200) {
      router.push({
        path: '/workbench',
        query: {
          paperId: item.id,
        },
      })
    }
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
  num: 1,
  info: '',
} as CreatePaper)
const createPaperDialog = ref(false)
function addNewPaper() {
  createPaper(createPaperState).then((res) => {
    if (res.code === 200)
      createPaperDialog.value = false
  })
}
const leftDrawer = ref(false)
const innerDrawer = ref(false)
const currentTemp = ref({} as TempImg)
const createCollaborateReq = ref({} as CreateCollaborateReq)
const meUpdateTempList = ref<TempImg[]>([])
const myJoinCartoonList = ref([] as CartoonItem[])
const myJoinChapterList = ref([] as ChapterInfo[])

// 查看我上传的临时图片
function showMeUpdate() {
  fetchMeUploadPaperTemp().then((res) => {
    meUpdateTempList.value = res.data as TempImg[]
    leftDrawer.value = true
  })
}
// 选中临时图片，尝试审核？
function selectTemp(item: TempImg) {
  currentTemp.value = item
  createCollaborateReq.value.imgUrl = item.imgUrl
  createCollaborateReq.value.info = item.info
  innerDrawer.value = true
  loadMyJoin()
}
// 加载我参与的漫画
function loadMyJoin() {
  fetchMyJoin().then((res) => {
    if (res.code === 200 && res.data !== undefined)
      myJoinCartoonList.value = res.data
  })
}
function selectMyJoinCartoonItem(item: CartoonItem) {
  createCollaborateReq.value.cartoonName = item.title
  createCollaborateReq.value.cartoonId = item.id
  fetchCartoonDetail(item.id).then((res) => {
    if (res.code === 200 && res.data !== undefined) {
      const data = res.data
      myJoinChapterList.value = data.chapterList
    }
  })
}

function selectMyJoinChapterItem(item: ChapterInfo) {
  createCollaborateReq.value.chapterId = item.id
  createCollaborateReq.value.chapterName = item.title
}

// 上传到collaborate
function uploadCollaborate() {
  fetchCreateCollaborate(createCollaborateReq.value).then((res) => {
    if (res.code === 200)
      innerDrawer.value = false
  })
}
function showStatus(status: string) {
  if (status === 'DOING')
    return '创作中'
  else
    return '完成'
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
    <el-drawer
      v-model="leftDrawer"
      size="60%"
      direction="rtl"
    >
      <el-drawer
        v-model="innerDrawer"
        :append-to-body="true"
      >
        <el-form :model="createCollaborateReq">
          <el-image width="100" :src="createCollaborateReq.imgUrl" />
          <el-form-item label="选择漫画">
            <el-dropdown>
              <el-button>
                {{ createCollaborateReq.cartoonName }}
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in myJoinCartoonList" :key="item.id" @click="selectMyJoinCartoonItem(item)">
                    {{ item.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-form-item>
          <el-form-item label="选择章节">
            <el-dropdown>
              <el-button>
                {{ createCollaborateReq.chapterName }}
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in myJoinChapterList" :key="item.id" @click="selectMyJoinChapterItem(item)">
                    {{ item.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="createCollaborateReq.info" />
          </el-form-item>
          <el-form-item label="页码">
            <el-input v-model="createCollaborateReq.num" />
          </el-form-item>
          <el-form-item>
            <el-button @click="uploadCollaborate">
              确定
            </el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <div>点击尝试审核</div>
      <div v-for="item in meUpdateTempList" :key="item.id" class="flex" @click="selectTemp(item)">
        {{ item.info }}
        {{ item.uploadTime }}
        <el-image :src="item.imgUrl" width="300px" />
      </div>
    </el-drawer>
    <el-dialog
      v-model="createPaperDialog"
      title="新增漫画页"
      width="500"
    >
      <el-form v-model="createPaperState">
        <el-form-item label="页码">
          <el-input-number v-model="createPaperState.num" />
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="createPaperState.info" />
        </el-form-item>
        <el-form-item>
          <el-button @click="createPaperDialog = false">
            取消
          </el-button>
          <el-button @click="addNewPaper">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="p-10 border-2" @click="createPaperDialog = true">
      新增漫画
    </div>
    <div class="p-3 border-2 " @click="showMeUpdate">
      我上传的漫画页
    </div>
    <div v-for="item in doingPaperList" :key="item.id" class="border-1 p-2 bg-gray-100" style="width: 300px" @click="addChapterPage(item)">
      {{ `页码${item.num}` }}
      {{ item.info }}
      <div>
        {{ showStatus(item.status) }}
      </div>
    </div>
    <div v-for="item in finishedPaperList" :key="item.id">
      <div>
        <img :src="item?.url" width="300px">
        <div>
          {{ showStatus(item.status) }}
        </div>
      </div>
    </div>
  </div>
</template>
