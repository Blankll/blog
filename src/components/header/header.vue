<template>
  <div class="home">
    <mu-appbar color="darkBlack">
      <mu-button icon slot="left">
        <mu-icon value="menu" @click="go()"></mu-icon>
      </mu-button>
      <div class="menu-item">
        <div @click="go()">SEVEN</div>
        <div @click="go('tags')">TAGS</div>
        <div @click="go('me')">ME</div>
      </div>
      <profile v-if="isLogin" slot="right"></profile>
      <div v-else @click="login" class="login" slot="right">LOGIN</div>
      <!-- <login-button v-if="!isLogin" ></login-button> -->
    </mu-appbar>
    <login-dialog
      v-if="loginProps.isShown"
      :login-props= "loginProps"
      @loginEmit="getLoginEmit">
      </login-dialog>
  </div>
</template>

<script>
import Token from '@/utils/token'
import Profile from '@/components/header/components/profile'
import LoginDialog from '@/components/logindialog/loginDialog'
export default {
  name: 'Header',
  components: {
    Profile,
    LoginDialog
  },
  data () {
    return {
      isLogin: false,
      loginProps: { isShown: false }
    }
  },
  methods: {
    go (url = '') {
      this.$router.push({ path: '/' + url })
    },
    getLoginEmit (recv) {
      console.log('emit recv:', recv)
      this.loginProps.isShown = false
    },
    login () {
      this.loginProps.isShown = true
    }
  },
  mounted () {
    if (Token.getToken()) {
      this.isLogin = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  width 100%
  position fixed
  z-index 9999
  .menu-item
    display flex
    div
      margin-right 20px
      cursor pointer
  .login
    margin-right 15px
    cursor pointer
    font-size 17p
</style>
