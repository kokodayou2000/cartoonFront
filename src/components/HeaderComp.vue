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
// kokodayou2000@126.com
// 0306201202@tute.edu.cn
const loginInfo = ref({
  mail: 'kokodayou2000@126.com',
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
          <el-dropdown>
            <el-button type="primary">
              <el-input v-model="loginInfo.mail" disabled/>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginInfo.mail = 'kokodayou2000@126.com'">账号A</el-dropdown-item>
                <el-dropdown-item @click="loginInfo.mail = '0306201202@tute.edu.cn'">账号B</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
  <el-row :gutter="20" class="mt-2 bg-gray-50 text-center items-center font-black">
    <el-col :span="2" />
    <el-col :span="6" class="font-black">
      <div @click="backHome">
        协作漫画
      </div>
    </el-col>
    <el-col :span="6">
      <div>
        <el-input v-model="searchVal" placeholder="漫画名称" :suffix-icon="Search" />
      </div>
    </el-col>
    <el-col :span="4">
      <div v-if="user.id === ''" @click="doLogin">
        登录
      </div>
      <div v-else>
        <div @click="doLogout">
          <el-avatar class="block" :size="50" :src="user.headImg" />
        </div>
      </div>
    </el-col>
    <el-col :span="3">
      <div v-if="user.id !== ''" @click="router.push('/manage')">
        后台
      </div>
    </el-col>
    <el-col :span="3">
      <div v-if="user.id !== ''">
        <div>{{ `点数:${user.points}` }}</div>
      </div>
    </el-col>
  </el-row>
</template>
