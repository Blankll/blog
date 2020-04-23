<template>
  <mu-appbar style="width: 100%;" color="primary">
  <mu-button icon slot="left" @click="leftbarStatus">
    <mu-icon value="menu"></mu-icon>
  </mu-button>
  <!-- <div>title</div> -->
  <profile v-if="isLogin" slot="right"></profile>
</mu-appbar>
</template>
<script>
import Token from '@/utils/token'
import Profile from '@/components/header/components/profile'
export default {
  name: 'AdminHomeTop',
  components: { Profile },
  data () {
    return {
      isLogin: false,
      leftBar: true
    }
  },
  mounted () {
    if (Token.getToken()) {
      this.isLogin = true
    }
  },
  methods: {
    leftbarStatus () {
      this.leftBar = !this.leftBar
      this.$emit('sideBarStatus', this.leftBar)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
