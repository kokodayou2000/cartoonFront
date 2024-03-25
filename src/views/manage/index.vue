<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { CartoonItem } from '../../types'
import { fetchMyCreate, fetchMyJoin } from '../../api/cartoon.ts'

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
onMounted(() => {
  getMeCreate()
  getMeJoin()
})
</script>

<template>
  <div>
    <div class="flex">
      我创建的
      <div v-for="item in myCreateCartoonList" :key="item.id">
        <img :src="item.coverUrl" width="140px" alt="" @click="jumpManageCartoonDetail(item.id)">
        {{ item.title }}
      </div>
    </div>
    <div class="flex">
      我加入的
      <div v-for="item in myJoinCartoonList" :key="item.id">
        <img :src="item.coverUrl" width="140px" alt="" @click="jumpManageCartoonDetail(item.id)">
        {{ item.title }}
      </div>
    </div>
    <!--        TODO 创建漫画 -->
    <div>
      创建漫画
    </div>
    <!--        TODO 管理员审核漫画 -->
    <div>
      需要审核的画面
    </div>
    <!--        TODO 本人上传但是还未通过审核的画 -->
    <div>
      我的上传
    </div>
  </div>
</template>

<style scoped>

</style>
