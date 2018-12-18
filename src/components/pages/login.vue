<template>
  <div class="login" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
    <p class="title">SEVEN</p>
    <div class="login-box">
      <input type="text" v-model="loginForm.username" placeholder="email" class="input-one">
      <input type="password" v-model="loginForm.password" placeholder="password" class="input-two">
      <button type="submit" @click="loginSubmit" class="login-button">登录</button>
      <button type="submit" @click="authorizationCode" class="login-button">authorizationCode</button>
    </div>
  </div>
</template>
<script>
import Token from '@/utils/token'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        grant_type: 'password',
        scope: '',
        username: '',
        password: ''
      },
      bgImg: '/static/login.jpg'
    }
  },
  methods: {
    loginSubmit () {
      this.$axios
        .post('/api/home/passwordlogin', this.loginForm)
        .then(res => {
          Token.setToken(res.data.access_token)
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    },
    authorizationCode () {
      this.loginForm.grant_type = 'password'
      this.$axios
        .post('/api/home/login', this.loginForm)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  width 100%
  height 100%
  // 背景图片居中无拉伸
  background-repeat no-repeat
  background-size 100% 100%
  background-position center
  background-attachment fixed
  .title
    font-family 'Source Sans Pro'
    color #333
    text-align center
    padding-top 150px
    padding-bottom 30px
    font-size 35px
    font-weight 300
  .login-box
    margin 0 auto
    width 400px
    height 300px
    background-color #fff
    opacity 0.9
    input
      height 40px
      width 90%
      margin-left 10px
      padding 2px 10px
      border-radius 0
      box-shadow none
      border-color #d2d6de
      border 1px solid #ccc
      background-color #fff
    .input-one
      margin-top 20px
    .input-two
      margin-top 20px
    .login-button
      color #fff
      margin 20px
      padding 10px
      background-color #333
      border 1px solid #ccc
      box-shadow none
      width 100px
    .login-button:hover
      cursor pointer

</style>
