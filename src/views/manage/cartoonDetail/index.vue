<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import {
  createNewChapter,
  fetchCartoonDetail,
  fetchNeedCheckCollaborate,
  fetchPassCollaborate,
} from '../../../api/cartoon.ts'
import type { CartoonDetail, ChapterInfo, CollaborateItem, CreateChapter, IUserInfo } from '../../../types'

defineOptions({
  name: 'ManageCartoonDetail',
})
const route = useRoute()
const router = useRouter()
const cartoonDetail = ref({} as CartoonDetail)
const addNewPatternState = reactive({
  addNewPatternDialog: false,
  addNewPatternCartoonId: '',
  addNewPatternId: '',
})
const newPage = ref(false)
const createChapterState = reactive({
  cartoonId: '',
  num: 0,
  free: true,
  title: '',
  info: '',
} as CreateChapter)
const searchUserName = ref('')
const searchUserNameList = ref([] as IUserInfo[])

// 新增参与者
// function addNewPatternFunc(item: CartoonItem) {
//   addNewPatternState.addNewPatternCartoonId = item.id
//   addNewPatternState.addNewPatternDialog = true
// }

function confirmAddNewPattern(userId: string) {
  addNewPatternState.addNewPatternId = userId
  // TODO 新增
}
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
      createChapterState.cartoonId = cartoonDetail.value.cartoonInfo.id
      createChapterState.num = cartoonDetail.value.chapterList.length + 1
    })
  }
}

function jumpChapterDetail(chapterInfo: ChapterInfo) {
  router.push({
    path: '/manageChapterDetail',
    query: {
      id: chapterInfo.id,
    },
  })
}
// 创建新章节
function addNewChapter() {
  createNewChapter(createChapterState).then(() => {})
}

const leftDrawer = ref(false)
const needCheckCollaborateList = ref([] as CollaborateItem[])
function check() {
  fetchNeedCheckCollaborate(cartoonDetail.value.cartoonInfo.id).then((res) => {
    if (res.code === 200 && res.data !== undefined) {
      needCheckCollaborateList.value = res.data
      leftDrawer.value = true
    }
  })
}
function pass(item: CollaborateItem) {
  fetchPassCollaborate(item.id).then((res) => {
    if (res.code === 200)
      leftDrawer.value = false
  })
}
onBeforeMount(() => {
  init()
})
</script>

<template>
  <div>
    {{ createChapterState }}
    <el-drawer
      v-model="leftDrawer"
      size="30%"
      direction="rtl"
    >
      <div v-for="item in needCheckCollaborateList" :key="item.id">
        {{ item.info }}
        <el-image :src="item.imgUrl" />
        <el-button @click="pass(item)">
          通过
        </el-button>
      </div>
    </el-drawer>
    <el-dialog v-model="newPage" title="新增章节" width="600" center>
      <el-form :model="createChapterState" label-width="auto" style="max-width: 600px">
        <el-form-item label="章节标题">
          <el-input v-model="createChapterState.title" style="width: 300px" />
        </el-form-item>
        <el-form-item label="章节信息">
          <el-input
            v-model="createChapterState.info"
            style="width: 300px"
            :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          />
        </el-form-item>
        <el-form-item label="章节号码">
          <el-input v-model="createChapterState.num" disabled />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-switch
            v-model="createChapterState.free"
            inline-prompt
            active-text="免费"
            inactive-text="收费"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="addNewChapter">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="addNewPatternState.addNewPatternDialog" title="新增参与者" width="500" center>
      <div>
        <el-input v-model="searchUserName" placeholder="用户名称" />
      </div>
      <div v-for="userItem in searchUserNameList" :key="userItem.id">
        {{ userItem.name }}
        <el-button @click="confirmAddNewPattern(userItem.id)">
          确定
        </el-button>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addNewPatternState.addNewPatternDialog = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
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
      <el-button class="font-thin" @click="check">
        审核
      </el-button>
    </div>
  </div>
  <div>
    <div class="grid grid-cols-6">
      <div v-for="item in chapterList" :key="item.id" @click="jumpChapterDetail(item)">
        <div class="font-black">
          {{ `${item.num}章 : ${item.title}` }}
        </div>
      </div>
      <div @click="newPage = true">
        新增章节
      </div>
    </div>
  </div>
</template>
