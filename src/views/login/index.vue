<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="formData"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>登录</h1>
          <h2>登录描述</h2>
          <el-form-item prop="username">
            <el-input
              v-model="formData.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              :prefix-icon="Lock"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="login(loginFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const formData = reactive({
  username: 'admin',
  password: 'atguigu123',
})
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let loading = ref(false)
const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入秘密', trigger: 'blur' }],
})

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore
        .userLogin(formData)
        .then((res) => {
          if (res.code === 200) {
            const { query }: any = $route
            $router.push({
              path: query.redirect || '/',
            })
            ElNotification({
              type: 'success',
              message: '登录成功',
            })
          } else {
            ElNotification({
              type: 'error',
              message: res.data.message,
            })
          }
        })
        .catch(() => {
          ElNotification({
            type: 'error',
            message: '登录失败',
          })
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    h1 {
      font-size: 40px;
      color: #fff;
    }
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }
    padding: 40px;
    width: 60%;
    position: relative;
    top: 30vh;
    background: url('../../assets/images/login_form.png');
    .login_btn {
      width: 100%;
    }
  }
}
</style>
