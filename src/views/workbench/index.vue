<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import MySignaturePad from '../../components/Pad.vue'

defineOptions({
  name: 'WorkBench',
})
const route = useRoute()
const router = useRouter()
function check(id: string | null | LocationQueryValue[]): string {
  if (typeof id === 'string')
    return id
  else
    return ''
}
onBeforeMount(() => {})
</script>

<template>
  <div>
    <div>
      {{ route.query.paperId }}
    </div>
    <div>
      <MySignaturePad :chapter-id="check(route.query.paperId)" />
    </div>
<!--    <el-button @click="router.back()">-->
<!--      返回-->
<!--    </el-button>-->
  </div>
</template>

<style scoped>

</style>
