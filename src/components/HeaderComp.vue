<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../use/useAuth.ts'
import type { IChargeDO, IChargeReq, ILoginInfo } from '../types'
import { sendEmailCaptchaCodeApi, userRegisterApi } from '../api/user.ts'
import { chargeApi, getChargeListApi } from '../api/order.ts'

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

// 充值相关
const chargeList = ref([] as IChargeDO[])
const currentChargeItem = ref({} as IChargeDO)
const showChargeDialog = ref(false)
function getChargeList() {
  return getChargeListApi()
}
function confirmCharge() {
  const chargeItem = {
    chargeId: currentChargeItem.value.id,
    clientType: 'H5',
  } as IChargeReq
  chargeApi(chargeItem).then((res) => {
    // const resStr = JSON.stringify(res)
    showChargeDialog.value = false
    const div = document.createElement('div')
    if (typeof res === 'string') {
      div.innerHTML = res
      div.style.display = 'none'
      document.body.appendChild(div)
      document.forms[0].submit()
    }
  })
}
function showChargeDialogFunc() {
  getChargeList().then((res) => {
    if (res.code === 200) {
      if (res.data) {
        chargeList.value = res.data
        showChargeDialog.value = true
      }
    }
  })
}

// 注册相关

const registerDialog = ref(false)
const innerVisible = ref(false)
const captchaCode = ref('')
const registerInfo = ref({
  code: '',
  head_img: '',
  mail: '',
  username: '',
  password: '',
  confirmPassword: '',
})

// 用户点击注册
function doRegister() {
  registerDialog.value = true
}
const captchaUrl = ref('http://127.0.0.1:8080/user-service/api/v1/notify/getChapter')

function reLoadCaptcha() {
  const captchaImg = document.getElementById('captchaImage') as HTMLImageElement
  captchaImg.src = captchaUrl.value
}
function sendEmailCaptchaCode() {
  sendEmailCaptchaCodeApi(registerInfo.value.mail, captchaCode.value).then((res) => {
    if (res.code === 0)
      innerVisible.value = true
  })
}

function registerConfirm() {
  // 如果发送验证码成功，则继续注册流程
  const registerData = {
    code: registerInfo.value.code,
    head_img: 'http://10.12.39.67:9000/cartoon/wv368oaKPl.png',
    mail: registerInfo.value.mail,
    name: registerInfo.value.username,
    pwd: registerInfo.value.password,
  }
  userRegisterApi(registerData).then(() => {
    innerVisible.value = false
    registerDialog.value = false
  })
}
</script>

<template>
  <el-dialog v-model="loginDialog" title="登录" width="800" append-to-body>
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
  <el-dialog v-model="registerDialog" title="注册" width="800" append-to-body>
    <el-dialog
      v-model="innerVisible"
      width="500"
      title="设置密码"
    >
      <el-form :model="registerInfo" label-width="auto" style="max-width: 600px">
        <el-form-item label="密码">
          <el-input v-model="registerInfo.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="registerInfo.confirmPassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerInfo.code" placeholder="请输入验证码" />
          <el-button @click="registerConfirm">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-form :model="registerInfo" label-width="auto" style="max-width: 600px" :rules="registerConfirm">
      <el-form-item label="用户名">
        <el-input v-model="registerInfo.username" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="registerInfo.mail" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="inline-block">
          <el-input v-model="captchaCode" placeholder="请输入验证码" />
          <img id="captchaImage" width="120px" :src="captchaUrl" alt="captcha" @click="reLoadCaptcha">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 10px;" @click="sendEmailCaptchaCode">
          发送验证码到邮箱
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="showChargeDialog" title="充值" width="800" append-to-body>
    <div class="recharge-options">
      <div
        v-for="(item, index) in chargeList"
        :key="index"
        class="recharge-option"
        :class="{ selected: item.id === currentChargeItem.id }"
        @click="currentChargeItem = item"
      >
        {{ item.info }}
        {{ item.money }}
      </div>
    </div>
    <div v-if="currentChargeItem">
      您的 金额 {{ currentChargeItem.money }}
      <div class="recharge-button">
        <el-button @click="confirmCharge">
          充值
        </el-button>
      </div>
    </div>
  </el-dialog>
  <el-row :gutter="20" class="mt-2 bg-gray-50 text-center items-center font-black">
    <!-- 协作漫画标题 -->
    <el-col :span="6" class="font-black" @click="backHome">
      <div>协作漫画</div>
    </el-col>

    <!-- 漫画名称搜索框 -->
    <el-col :span="6">
      <div>
        <el-input v-model="searchVal" placeholder="漫画名称" :suffix-icon="Search" />
      </div>
    </el-col>

    <!-- 登录按钮 -->
    <el-col :span="5">
      <div v-if="user.id === ''" style="float: left" @click="doLogin">
        登录
      </div>
      <div v-if="user.id === ''" style="float: left" @click="doRegister">
        | 注册
      </div>
      <div v-else>
        <div @click="doLogout">
          <el-avatar class="block" :size="50" :src="user.headImg" />
        </div>
      </div>
    </el-col>

    <!-- 后台按钮 -->
    <el-col :span="2">
      <div v-if="user.id !== ''" @click="router.push('/manage')">
        后台
      </div>
    </el-col>

    <!-- 用户点数信息 -->
    <el-col :span="3">
      <div v-if="user.id !== ''" @click="showChargeDialogFunc">
        {{ `点数:${user.points}` }}
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.recharge-options {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.recharge-option {
  width: calc(33.33% - 10px);
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.recharge-option.selected {
  background-color: #4444ea;
  color: #fff;
}

.current-amount {
  margin-top: 10px;
  text-align: center;
}

.recharge-button {
  margin-top: 20px;
  text-align: center;
}
</style>
