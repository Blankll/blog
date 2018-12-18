<template>
  <div class="home">
    <home-header></home-header>
    <home-convas></home-convas>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import HomeConvas from '@/components/convas/convas'
export default {
  name: 'Home',
  components: {
    HomeHeader: Header,
    HomeConvas
  },
  data () {
    return {
      isLogin: false,
      date: undefined
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.home
  width 100%
</style>
