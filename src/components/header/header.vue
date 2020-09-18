<template>
  <div class="home">
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" @click="go()">SEVEN</b-navbar-brand>
      <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="go('tags')">TAGS</b-nav-item>
        <b-nav-item @click="go('me')">ME</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right>
          <profile v-if="isLogin" slot="right"></profile>
          <div v-else @click="login" class="login" slot="right">LOGIN</div>
        </b-nav-item>>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
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
</style>
