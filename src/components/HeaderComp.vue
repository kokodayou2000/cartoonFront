<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../use/useAuth.ts'
import type { ILoginInfo } from '../types'
import axios from "axios";

const searchVal = ref('')
const router = useRouter()
const { user, login, logout } = useAuth()
const captcha = ref('')
const captchaImageUrl = ref('http://10.12.5.242:8080/user-service/api/v1/notify/getChapter?')




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
const registerDialog = ref(false)
function doRegister(){
  registerDialog.value=true
}
const registerInfo = ref({
  code:'',
  head_img:'',
  mail: '',
  username: '',
  password: '',
  confirmPassword:'',
})
async function registerConfirm() {
  if (validateForm()) {
try {
  // 如果发送验证码成功，则继续注册流程
  const registerData = {
    code: registerInfo.value.code,
    head_img: "http://10.12.5.242:9000/cartoon/wv368oaKPl.png",
    mail: registerInfo.value.mail,
    name: registerInfo.value.username,
    pwd: registerInfo.value.password
  };
  console.log(registerInfo.value.code+"-"+registerInfo.value.mail)
  // 向后端发送注册请求
  const response = await axios.post(`http://10.12.5.242:8080/user-service/api/v1/user/register`, registerData);
  // 注册成功后的逻辑处理
  if (response.data.success) {
    console.log('注册成功:', response.data);
  } else {
    console.log(response.data+"-"+response.data.msg+"-"+response.data.code+"-")
    console.error('注册失败:', response.data.msg);
    // 处理注册失败逻辑
  }
}catch (error) {
    throw new Error('注册失败: ' + error.msg);
  }


  }
}

async function sendVerifictionCodewait(){
  // 先发送验证码
  await sendVerificationCode(registerInfo.value.mail, captcha.value);
}
async function sendVerificationCode(email:String, captcha:String) {

    // 使用 axios 发送请求到后端发送验证码接口
    console.log(email+"=="+captcha)
    const response = await axios.get(`http://10.12.5.242:8080/user-service/api/v1/notify/sendCode?to=${email}&captcha=${captcha}`)
    console.log(response.data)
    // 根据后端返回的数据进行处理
    if (response.data.code==0)
      console.log('验证码发送成功')
    else
      throw new Error(`验证码发送失败: ${response.data.msg}`)
}

function validateForm() {
  if (!registerInfo.value.username || !registerInfo.value.mail || !registerInfo.value.password || !registerInfo.value.confirmPassword || !captcha.value) {
    console.error('Please fill in all fields.')
    // Handle validation failure here
    return false
  }
  if (registerInfo.value.password !== registerInfo.value.confirmPassword) {
    console.error('Passwords do not match.')
    // Handle validation failure here
    return false
  }
  // Validation successful
  return true
}

function fetchCaptchaImage(){
  captchaImageUrl.value='http://10.12.5.242:8080/user-service/api/v1/notify/getChapter?'
}




// function selectAmount(amount: number) {
//   rechargeInfo.value.amount = `${amount}元`;
// }

// async function confirmRecharge() {
//   try {
//     const response = await axios.post('/api/recharge', {
//       amount: parseInt(rechargeInfo.value.amount),
//     });
//     console.log(response.data);
//     // 进行充值成功的处理逻辑
//   } catch (error) {
//     console.error('充值失败:', error);
//     // 进行充值失败的处理逻辑
//   }
// }

const rechargeDialog = ref(false);
const rechargeInfo = ref({
  amount: '',
});
function doreRharge(){
  rechargeDialog.value=true
}
const rechargeOptions = [
  { label: '10元', value: 10 },
  { label: '20元', value: 20 },
  { label: '50元', value: 50 },
  { label: '100元', value: 100 },
  { label: '200元', value: 200 },
  { label: '500元', value: 500 },
];

function selectAmount(amount: string) {
  rechargeInfo.value.amount = amount;
}

async function confirmRecharge() {
  try {
    const response = await axios.post('/api/recharge', {
      amount: parseInt(rechargeInfo.value.amount),
    });
    console.log(response.data);
    if (response.data.success) {
      rechargeDialog.value = false; // 关闭充值框
      showQRCode(response.data.qrCodeUrl); // 显示二维码
    } else {
      console.error('充值失败:', response.data.message);
      // 处理充值失败逻辑
    }
  } catch (error) {
    console.error('充值失败:', error);
    // 处理充值失败逻辑
  }
}

function showQRCode(qrCodeUrl: string) {
  // 此处为示例，假设有一个方法用于显示二维码
  // 实际情况需根据具体需求进行处理，可能需要在当前页面显示、打开新页面、或者弹出模态框等
  console.log('显示二维码:', qrCodeUrl);
}
</script>

<template>
  <teleport to="body">
    <el-dialog v-model="loginDialog" title="登录" width="800">
      <el-form :model="loginInfo" label-width="auto" style="max-width: 600px">
        <el-form-item label="邮箱">
          <el-dropdown>
            <el-button type="primary">
              <el-input v-model="loginInfo.mail" disabled />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginInfo.mail = 'kokodayou2000@126.com'">
                  账号A
                </el-dropdown-item>
                <el-dropdown-item @click="loginInfo.mail = '0306201202@tute.edu.cn'">
                  账号B
                </el-dropdown-item>
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

  <teleport to="body">
    <el-dialog v-model="registerDialog" title="注册" width="800">
      <el-form :model="registerInfo" label-width="auto" style="max-width: 600px" :rules="registerConfirm">
        <el-form-item label="邮箱">
          <el-input v-model="registerInfo.mail" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="registerInfo.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerInfo.password" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="registerInfo.confirmPassword" type="password" />
        </el-form-item>
        <el-form-item label="验证码" style="display: flex; align-items: center;">
          <el-input v-model="captcha" placeholder="请输入图形验证码发送邮件"/>
          <img :src="captchaImageUrl" @click="fetchCaptchaImage" alt="captcha" style="cursor: pointer; margin-left: 10px;">
          <el-button @click="sendVerifictionCodewait" type="primary" style="margin-left: 10px;">
            发送
          </el-button>
        </el-form-item>
        <el-form-item label="注册验证码" style="display: flex; align-items: center;">
          <el-input v-model="registerInfo.code"/>
          <el-button @click="registerConfirm" type="primary">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </teleport>


  <teleport to="body">
    <el-dialog v-model="rechargeDialog" title="充值" width="800">
      <div class="recharge-options">
        <div
            v-for="(option, index) in rechargeOptions"
            :key="index"
            class="recharge-option"
            :class="{ 'selected': option.label === rechargeInfo.amount }"
            @click="selectAmount(option.label)"
        >
          {{ option.label }}
        </div>
      </div>
      <div class="current-amount" v-if="rechargeInfo.amount !== ''">
        当前选择金额: {{ rechargeInfo.amount }}
      </div>
      <div class="recharge-button">
        <el-button @click="confirmRecharge" type="primary" :disabled="rechargeInfo.amount === ''">
          充值
        </el-button>
      </div>
    </el-dialog>
  </teleport>

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
      <div style="float: left" v-if="user.id === ''" @click="doLogin">登录</div>
      <div style="float: left" v-if="user.id === ''" @click="doRegister"> | 注册</div>
      <div v-else>
        <div @click="doLogout">
          <el-avatar class="block" :size="50" :src="user.headImg" />
        </div>
      </div>
    </el-col>

    <!-- 后台按钮 -->
    <el-col :span="2">
      <div v-if="user.id !== ''" @click="router.push('/manage')">后台</div>
    </el-col>

    <!-- 用户点数信息 -->
    <el-col :span="3">
      <div v-if="user.id !== ''" @click="doreRharge">{{ `点数:${user.points}` }}</div>
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
