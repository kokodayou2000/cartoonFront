<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../use/useAuth.ts'
import type { ILoginInfo } from '../types'

const searchVal = ref('')
const router = useRouter()
const { user, login, logout } = useAuth()

const loginDialog = ref(false)
function doLogin() {
  loginDialog.value = true
}
const loginInfo = ref({
  mail: '0306201202@tute.edu.cn',
  pwd: '123',
} as ILoginInfo)
function doLogout() {
  logout()
  location.reload()
}
function loginConfirm() {
  login(loginInfo.value).then(() => {
    loginDialog.value = false
  })
}
function backHome() {
  router.push('/')
}
</script>

<template>
  <teleport to="body">
    <el-dialog v-model="loginDialog" title="登录" width="800">
      <el-form :model="loginInfo" label-width="auto" style="max-width: 600px">
        <el-form-item label="邮箱">
          <el-input v-model="loginInfo.mail" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginInfo.pwd" />
        </el-form-item>
        <el-form-item>
          <el-button @click="loginConfirm">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </teleport>
  <el-row :gutter="20" class="mt-2">
    <el-col :span="2" />
    <el-col :span="8">
      <div @click="backHome">
        协作漫画
      </div>
    </el-col>
    <el-col :span="10">
      <div>
        <el-input v-model="searchVal" placeholder="漫画名称" :suffix-icon="Search" />
      </div>
    </el-col>
    <el-col :span="4">
      <div v-if="user.id === ''" @click="doLogin">
        登录
      </div>
      <div v-else style="display: flex">
        <div @click="doLogout">
          <!--  TODO 模仿b漫那种鼠标 hover  能下拉      -->
          {{ user.name }}
        </div>
        <el-button @click="router.push('/manage')">
          管理员
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>
