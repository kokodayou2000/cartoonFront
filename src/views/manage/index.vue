<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CartoonItem, CreateCartoon } from '../../types'
import { fetchCreateCartoon, fetchMyCreate, fetchMyJoin } from '../../api/cartoon.ts'

defineOptions({
  name: 'Manage',
})
const router = useRouter()
const myCreateCartoonList = ref([] as CartoonItem[])
const myJoinCartoonList = ref([] as CartoonItem[])

function getMeCreate() {
  fetchMyCreate().then((res) => {
    if (res.code === 200 && typeof res.data === 'object')
      myCreateCartoonList.value = res.data as CartoonItem[]
  })
}

function getMeJoin() {
  fetchMyJoin().then((res) => {
    if (res.code === 200 && typeof res.data === 'object')
      myJoinCartoonList.value = res.data as CartoonItem[]
  })
}

function jumpManageCartoonDetail(id: string) {
  router.push({
    path: '/manageCartoonDetail',
    query: {
      id,
    },
  })
}
const createCartoonVisible = ref(false)

const createCartoonItem = reactive({
  title: '',
  introduction: '',
  tags: [],
  price: 0,
} as CreateCartoon)

const currentTags = ref('')
function createCartoonVisibleConfirm() {
  fetchCreateCartoon(createCartoonItem).then(() => {})
  createCartoonVisible.value = false
}
function addTags() {
  createCartoonItem.tags.push(currentTags.value)
}
function removeTags() {
  createCartoonItem.tags.pop()
}
onMounted(() => {
  getMeCreate()
  getMeJoin()
})
</script>

<template>
  <div>
    <el-dialog v-model="createCartoonVisible" :show-close="false" width="500">
      <el-form :model="createCartoonItem">
        <el-form-item label="漫画名称">
          <el-input v-model="createCartoonItem.title" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="createCartoonItem.introduction" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="createCartoonItem.price" />
        </el-form-item>
        <el-form-item label="标签">
          <el-tag
            v-for="(item, index) in createCartoonItem.tags"
            :key="index"
          >
            {{ item }}
          </el-tag>
          <div>
            <el-input v-model="currentTags" />
            <el-button @click="addTags">
              新增
            </el-button>
            <el-button @click="removeTags">
              删除
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="createCartoonVisible = false">
            取消
          </el-button>
          <el-button @click="createCartoonVisibleConfirm">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="flex">
      <div class="font-black">
        我创建的
      </div>
      <div v-for="item in myCreateCartoonList" :key="item.id" class="m-6">
        <img :src="item.coverUrl" width="100px" alt="" @click="jumpManageCartoonDetail(item.id)">
        {{ item.title }}
      </div>
    </div>
    <div class="flex">
      <div class="font-black">
        我加入的
      </div>
      <div v-for="item in myJoinCartoonList" :key="item.id" class="m-6">
        <img :src="item.coverUrl" width="100px" alt="" @click="jumpManageCartoonDetail(item.id)">
        {{ item.title }}
      </div>
    </div>
    <div class="flex">
      <el-button @click="createCartoonVisible = true">
        创建漫画
      </el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
