<template>
  <div class="bg row">
    <v-card class="col" hover>
      <v-form v-model="valid" lazy-validation ref="form">
        <!-- 手机号和密码 -->
        <v-text-field v-model="phone" required label="Phone" :rules="phoneRules"></v-text-field>

        <v-text-field v-model="phone" required label="Email" :rules="phoneRules"></v-text-field>

        <v-text-field v-model="password" required label="Password" :rules="passwordRules"></v-text-field>

        <v-text-field v-model="password" required label="Confirm Password" :rules="passwordRules"></v-text-field>

        <v-btn color="warning" @click="reset">点击注册注册</v-btn>
        <v-btn color="primary" class="mr-4" @click="submit" >已有账号跳转登录</v-btn>
      </v-form>
    </v-card>

    <!-- 遮罩层 -->
    <v-overlay absolute z-index="5" class="mask"></v-overlay>
  </div>
</template>
<script src="https://unpkg.com/lvp.js/lib/lvp.js"></script>
<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      phone: '',
      password: '',
      phoneRules: [(v) => (/^[1][3456789]\d{9}/.test(v)) || '手机号格式错'],
      passwordRules: [
        (v) => (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{11,}/.test(v)) || '密码必须是包含至少一个大小字母的11位字符串'
      ]
    }
  },
  methods: {
    submit() {
      // this.$refs.form.validate()
      this.validate()
      this.axios({
        method: 'post',
        url: '/user/login',
        data: {
          phone: this.phone,
          password: this.password
        }
      }).then((res) => {
        // console.log(res.data);
        if (res.data.code === 1) {
          console.log(res.data.data)
          this.$layer.alert(
            '登录成功！',
            {
              title: '提示',
              icon: 2 //0,1,2,3
            },
            (layerid) => {
              this.$layer.close(layerid)
              this.$store.commit('login', res.data.data)
              localStorage.setItem('login', res.data.data)
              this.$router.push('/index')
            }
          )
        } else {
          this.$layer.alert('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: url('http://47.96.31.161:9000/my-file/img112.jpg');
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
    background-color: #eee;
    border-radius: 10px;
    z-index: 10;
    text-align: center;
  }
}
</style>
