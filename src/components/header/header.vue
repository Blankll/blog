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
      <login-button v-if="!isLogin" slot="right"></login-button>
    </mu-appbar>
  </div>
</template>

<script>
import Token from '@/utils/token'
import Profile from '@/components/header/components/profile'
import LoginButton from '@/components/header/components/login'
export default {
  name: 'Header',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    Profile,
    LoginButton
  },
  methods: {
    go (url = '') {
      this.$router.push({ path: '/' + url })
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
</style>
