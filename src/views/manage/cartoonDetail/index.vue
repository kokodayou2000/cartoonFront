<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { fetchCartoonDetail } from '../../../api/cartoon.ts'
import type { CartoonDetail, CartoonItem, ChapterInfo, IUserInfo } from '../../../types'

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
const searchUserName = ref('')
const searchUserNameList = ref([] as IUserInfo[])

function addNewPatternFunc(item: CartoonItem) {
  addNewPatternState.addNewPatternCartoonId = item.id
  addNewPatternState.addNewPatternDialog = true
}
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
    })
  }
}
// TODO
function updateCoverImg() {}

function jumpChapterDetail(chapterInfo: ChapterInfo) {
  router.push({
    path: '/manageChapterDetail',
    query: {
      id: chapterInfo.id,
    },
  })
}
onBeforeMount(() => {
  init()
})
</script>

<template>
  <div>
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
    <div>
      <div>
        {{ cartoonInfo?.title }}
      </div>
      <div>
        <!--        TODO 修改封面 -->
        <img :src="cartoonInfo?.coverUrl" width="100px" alt="" @click="updateCoverImg">
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
      <!--        TODO 新增参与者 -->
      <div @click="addNewPatternFunc(cartoonInfo)">
        新增参与者
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
      <!--  TODO 新增章节     -->
      <div>新增章节</div>
    </div>
  </div>
</template>
