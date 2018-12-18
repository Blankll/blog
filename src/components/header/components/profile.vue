<template>
  <div>
     <mu-menu>
       <div class="profile">
        <img :src="imageUrl" alt="nation" class="nation-image">
       </div>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Profile</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item @click="loginOut" button>
          <mu-list-item-content>
            <mu-list-item-title><div>Login Out</div></mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
     </mu-menu>
  </div>
</template>
<script>
import Token from '@/utils/token'
export default {
  name: 'Profile',
  data () {
    return {
      imageUrl: '/static/logo.jpg'
    }
  },
  methods: {
    loginOut () {
      this.$axios
        .post('/api/home/loginout')
        .then(res => {
          console.log('退出成功')
          this.isLogin = false
          Token.removeToken()
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
          this.isLogin = false
          Token.removeToken()
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.profile
  width 40px
  height 40px
  margin 10px
  .nation-image
      position absolute
      width 40px
      height 40px
      object-fit cover
      border-radius 50%
</style>
