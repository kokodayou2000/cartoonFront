<script lang="ts" setup>
import { VueSignaturePad } from 'vue-signature-pad'
import { computed, nextTick, onMounted, ref } from 'vue'
import PickColors from 'vue-pick-colors'
import {fetchUploadPaperTemp, getPadList, updatePad} from '../api/cartoon.ts'
import type {Pen, RawPad, UpdatePad} from '../types'
import { useAuth } from '../use/useAuth.ts'

defineOptions({
  name: 'MySignaturePad',
})

const props = withDefaults(defineProps<IProps>(), {
  chapterId: '',
})

interface IProps {
  chapterId: string
}

const { user } = useAuth()
const signaturePadRef = ref()
const signaturePadOtherRef = ref()
const currentPadList = ref([] as RawPad[])
const penColor = ref('#000000')
// 这个是放到下层了，不需要设置透明
const backgroundColor = ref('#ffffff00')
const backgroundOtherColor = ref('#ffffff00')
const info = ref('')

const currentUserPad = computed(() => {
  const index = currentPadList.value.findIndex((item) => {
    return item.userId === user.value.id
  })
  return currentPadList.value[index]
})

const currentOtherPadList = computed(() => {
  return currentPadList.value.filter(item => item.userId !== user.value.id)
})

function undo() {
  signaturePadRef.value.undoSignature()
}

// 加载其他用户的画板
function otherRawPad(data: Pen[]) {
  const updateData = data.map((item) => {
    item.color = '#1feae2'
    return item
  })
  signaturePadOtherRef.value.fromData(updateData)
}

// 当前用户的画板
function currentUserRawPad(data: Pen[]) {
  signaturePadRef.value.fromData(data)
}

// 下载图片
function downLoadImg(dataURL: string, filename: string) {
  const blob = dataURLToBlob(dataURL)
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  // a.style = 'display: none'
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}

function dataURLToBlob(dataURL: string) {
  // Code taken from https://github.com/ebidel/filer.js
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i)
    uInt8Array[i] = raw.charCodeAt(i)
  return new Blob([uInt8Array], { type: contentType })
}

function doSomething() {
  const otherData = signaturePadOtherRef.value.toData() as []
  const currentData = signaturePadRef.value.toData() as []
  currentData.push(...otherData)
  signaturePadRef.value.fromData(currentData)
  const { isEmpty, data } = signaturePadRef.value.saveSignature()
  if (isEmpty)
    return
  const blob = dataURLToBlob(data)
  const file = new File([blob], 'test.png')
  //
  uploadPaperTemp(file, info.value)
}
function uploadPaperTemp(file: File, info: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('info', info)
  fetchUploadPaperTemp(formData).then((res) => {
    if (res.code === 200 && res.data !== null) { /* empty */ }
  })
}

function getFromRemote() {
  getPadList(props.chapterId)
    .then((res) => {
      if (res.code === 200) {
        if (res.data !== undefined) {
          currentPadList.value = res.data
          // 加载当前用户的
          currentUserRawPad(currentUserPad.value.penList)
          currentOtherPadList.value.forEach((item) => {
            // 加载其他用户的
            otherRawPad(item.penList)
          })
        }
      }
    })
}

function upload() {
  backgroundColor.value = '#ffffff'
  nextTick(doSomething).then(() => {
    backgroundColor.value = '#ffffff'
  })
}

// function save() {
//   const { isEmpty, data } = signaturePadRef.value.saveSignature()
//   if (isEmpty)
//     return
//   download(data, 'filename')
// }
// function clear() {
//   signaturePadRef.value.clearSignature()
// }

function updateRemote() {
  const data = signaturePadRef.value.toData()
  const updateReq = {
    id: currentUserPad.value.id,
    penList: data,
  } as UpdatePad
  updatePad(updateReq).then(() => {})
}

function onBegin() {}

function onEnd() {
  updateRemote()
}
onMounted(() => {
  getFromRemote()
})
</script>

<template>
  <div>
    <div class="w-1/2 float-left">
      <VueSignaturePad ref="signaturePadOtherRef" class="absolute" width="300px" height="600px" :options="{ backgroundOtherColor, penColor }" />
      <VueSignaturePad ref="signaturePadRef" class="absolute border" width="300px" height="600px" :options="{ backgroundColor, penColor, onBegin, onEnd }" />
    </div>
    <div class="w-1/2 float-right">
      <div>
        <PickColors v-model:value="penColor" show-alpha />
        <input v-model="info" placeholder="请输入页面信息" />
        <el-button @click="undo">
          撤销
        </el-button>
        <!--        <el-button @click="save"> -->
        <!--          保存到本地 -->
        <!--        </el-button> -->
        <!--        <el-button @click="clear"> -->
        <!--          清理 -->
        <!--        </el-button> -->
        <!--        <el-button @click="updateRemote"> -->
        <!--          将数据跟新到远程 -->
        <!--        </el-button> -->
        <!--        <el-button @click="getFromRemote"> -->
        <!--          读取远程的 -->
        <!--        </el-button> -->
        <el-button @click="upload">
          上传
        </el-button>
      </div>
    </div>
  </div>
</template>
