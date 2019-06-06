<template>
  <mu-appbar style="width: 100%;" color="primary">
  <mu-button icon slot="top">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  <!-- Title -->
  <profile v-if="isLogin" slot="right"></profile>
      <login-button v-if="!isLogin" slot="right"></login-button>
</mu-appbar>
</template>
<script>
import Token from '@/utils/token'
import Profile from '@/components/header/components/profile'
import LoginButton from '@/components/header/components/login'
export default {
  name: 'AdminHomeTop',
  components: {
    Profile,
    LoginButton
  },
  data () {
    return {
      isLogin: false
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
