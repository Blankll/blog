<template>
  <div class="home">
    <mu-appbar color="primary">
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      Title
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
    if (Token.getToken) {
      this.isLogin = true
    }
  },
  methods: {
    loginOut () {
      this.$axios
        .post('/api/home/loginout')
        .then(res => {
          console.log('退出成功')
          this.isLogin = false
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  width 100%
</style>
