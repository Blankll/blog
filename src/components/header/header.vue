<template>
  <div class="home">
    <mu-appbar color="darkBlack">
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      SEVEN
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
  mounted () {
    if (Token.getToken()) {
      this.isLogin = true
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.home
  width 100%
</style>
