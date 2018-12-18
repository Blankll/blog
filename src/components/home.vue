<template>
  <div>
    <mu-appbar style="width: 100%;" title="Title"> </mu-appbar>
  </div>
</template>

<script>
import Token from '@/utils/token'
export default {
  name: 'Home',
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
<style>
demo-date-picker {
  margin: 8px;
}
</style>
