<template>
  <div @click="login" class="login">LOGIN</div>
</template>
<script>
export default {
  name: 'LoginButton',
  data () {
    return {

    }
  },
  methods: {
    login () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  margin-right 15px
  cursor pointer
  font-size 17px
</style>
