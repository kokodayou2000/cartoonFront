<script lang="ts" setup>
import { VueSignaturePad } from 'vue-signature-pad'
import { onMounted, ref } from 'vue'
import PickColors from 'vue-pick-colors'
import { createPad, getPad, getPadList, updatePad } from '../api/cartoon.ts'
import type { Pen, RawPad, UpdatePad } from '../types'

defineOptions({
  name: 'MySignaturePad',
})
const signaturePadRef = ref()
const selectDialog = ref(false)
const rawPadList = ref([] as RawPad[])
const currentPad = ref({} as RawPad)
const newPadName = ref('')

function undo() {
  signaturePadRef.value.undoSignature()
}
function save() {
  const { isEmpty, data } = signaturePadRef.value.saveSignature()
  if (isEmpty)
    return
  download(data, 'filename')
}
function tempSave() {
  const data = signaturePadRef.value.toData()
  localStorage.setItem('temp', JSON.stringify(data))
}

function updateRemote() {
  const data = signaturePadRef.value.toData()
  const updateReq = {
    id: currentPad.value.id,
    penList: data,
  } as UpdatePad
  updatePad(updateReq).then(() => {})
}
// function getTemp() {
//   const str = localStorage.getItem('temp')
//   if (str !== null) {
//     const parse = JSON.parse(str)
//     signaturePadRef.value.fromData(parse)
//   }
// }

function remoteSetTemp(data: Pen[]) {
  signaturePadRef.value.fromData(data)
}
function clear() {
  signaturePadRef.value.clearSignature()
}

function download(dataURL: string, filename: string) {
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

// const option = reactive({
//   dotSize: (0.5 + 2.5) / 2,
//   minWidth: 0.5,
//   maxWidth: 2.5,
//   throttle: 16,
//   minDistance: 5,
//   backgroundColor: 'rgb(255,255,255)',
//   penColor: '#000',
//   velocityFilterWeight: 0.7,
// })

const backgroundColor = ref('#ffffff')
const penColor = ref('#000000')

function create() {
  createPad(newPadName.value)
    .then((res) => {
      if (res.code === 200) {
        newPadName.value = ''
        currentPad.value = res.data
      }
    })
}
function getFromRemote() {
  const id = currentPad.value.id
  getPad(id)
    .then((res) => {
      if (res.code === 200) {
        if (res.data !== undefined) {
          currentPad.value = res.data
          remoteSetTemp(currentPad.value.penList)
        }
      }
    })
}

onMounted(() => {
  // getFromRemote('2009100556')
})

function select() {
  getPadList().then((res) => {
    if (res.data !== undefined) {
      rawPadList.value = res.data
      selectDialog.value = true
    }
  })
}
function selectCurrentItem(item: RawPad) {
  currentPad.value = item
  getFromRemote()
  selectDialog.value = false
}
// TODO VueSignaturePad 源码，信息id字段，允许多人画画
</script>

<template>
  <div style="border: 1px red solid">
    <teleport to="body">
      <el-dialog v-model="selectDialog" title="选择" width="800">
        <div v-for="item in rawPadList" :key="item.id" @click="selectCurrentItem(item)">
          {{ item.name }}
        </div>
        <el-input v-model="newPadName">
          <template #append>
            <div @click="create">
              新建
            </div>
          </template>
        </el-input>
      </el-dialog>
    </teleport>
    {{ currentPad.name }}
    <div>
      <PickColors v-model:value="penColor" show-alpha />
    </div>
    <VueSignaturePad ref="signaturePadRef" class="border" width="300px" height="600px" :options="{ backgroundColor, penColor }" />
    <div>
      <el-button @click="select">
        选择作品
      </el-button>
      <el-button @click="save">
        保存
      </el-button>
      <el-button @click="tempSave">
        临时存储
      </el-button>
      <!--      <el-button @click="getTemp"> -->
      <!--        读取本地的 -->
      <!--      </el-button> -->
      <el-button @click="undo">
        撤销
      </el-button>
      <el-button @click="clear">
        清理
      </el-button>
      <el-button @click="updateRemote">
        将数据跟新到远程
      </el-button>
      <el-button @click="getFromRemote()">
        读取远程的
      </el-button>
    </div>
  </div>
</template>
