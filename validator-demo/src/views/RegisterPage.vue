<template>
  <div class="bg row">
    <v-card class="col" hover>
      <v-form lazy-validation ref="form">
        <!-- 手机号和密码 -->
        <v-text-field
          v-model="phone"
          required
          label="Phone"
          :rules="phoneRules"
        ></v-text-field>

        <v-text-field
          v-model="phone"
          required
          label="Email"
          :rules="phoneRules"
        ></v-text-field>

        <v-text-field
          v-model="password"
          required
          label="Password"
          :rules="passwordRules"
        ></v-text-field>

        <v-text-field
          v-model="password"
          required
          label="Confirm Password"
          :rules="passwordRules"
        ></v-text-field>

        <v-btn color="warning">点击注册注册</v-btn>
        <v-btn color="primary" class="mr-4" @click="toLoginPage">已有账号跳转登录</v-btn>
      </v-form>
    </v-card>

    <!-- 遮罩层 -->
    <v-overlay absolute z-index="5" class="mask"></v-overlay>
  </div>
</template>
<script src="https://unpkg.com/lvp.js/lib/lvp.js"></script>
<script>
import router from '@/router'
export default {
  name: 'RegisterPage',
  data() {
    return {
      phone: '',
      password: '',
      phoneRules: [(v) => /^[1][3456789]\d{9}/.test(v) || '手机号格式错'],
      passwordRules: [
        (v) =>
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{11,}/.test(v) ||
          '密码必须是包含至少一个大小字母的11位字符串'
      ]
    }
  },
  methods: {
    toLoginPage() {
      router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: url('https://wang-rich.oss-cn-hangzhou.aliyuncs.com/md/202204221044969.jpg');
  background-size: 100% 100%;
}
.mask {
  background-image: linear-gradient(to right, #bf30ac 0%, #0f9d58 100%);
  opacity: 0.7;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .col {
    flex: 0 0 40%;
    height: 360px;
    background-color: rgba(238, 238, 238, 0.529);
    border-radius: 10px;
    z-index: 10;
    text-align: center;
  }
}
</style>
