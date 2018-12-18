<template>
  <div class="home">
    <home-header></home-header>
  </div>
</template>

<script>
import Token from '@/utils/token'
import Header from '@/components/header/header'
export default {
  name: 'Home',
  components: {
    HomeHeader: Header
  },
  data () {
    return {
      isLogin: false,
      date: undefined
    }
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
