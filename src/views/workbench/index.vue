<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import MySignaturePad from '../../components/Pad.vue'

defineOptions({
  name: 'WorkBench',
})
const route = useRoute()
const router = useRouter()
onBeforeMount(() => {
  console.log(router.listening)
  console.log(route.query.number)
})
</script>

<template>
  <div>
    <div>
      漫画页的信息
      {{ route.query.id }}
    </div>
    <div>
      <MySignaturePad />
    </div>
  </div>
</template>

<style scoped>

</style>
