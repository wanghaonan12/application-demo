<template>
  <div class="bg row">
    <div class="card">
      <div class="card-side front">
        <div>Front Side</div>
      </div>
      <div class="card-side back">
        <div>Back Side</div>
      </div>
    </div>
  </div>
</template>
<script src="https://unpkg.com/lvp.js/lib/lvp.js"></script>
<script>
import router from '@/router'
export default {
  name: 'LoginPage',
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
    submit() {
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
    },
    toRegisterPage() {
      router.push({ path: 'register' })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: url('https://wang-rich.oss-cn-hangzhou.aliyuncs.com/md/202204221044969.jpg');
  background-size:cover;
  .card {
    perspective: 150rem;
    position: relative;
    height: 40rem;
    max-width: 400px;
    margin: 2rem;
    box-shadow: none;
    background-color: none;
  }

  .card-side {
    height: 35rem;
    border-radius: 15px;
    transition: all 0.8s ease;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    padding: 2rem;
    color: #fff;
  }

  .card-side.back {
    transform: rotateY(-180deg);
    background-color: #4158d0;
    background-image: linear-gradient(
      43deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    );
  }

  .card-side.front {
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  }

  .card:hover .card-side.front {
    transform: rotateY(180deg);
  }

  .card:hover .card-side.back {
    transform: rotateY(0deg);
  }
}
</style>
