<template>
  <div class="home">
    <home-header></home-header>
    <home-convas></home-convas>
    <home-list></home-list>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import HomeConvas from '@/components/convas/convas'
import HomeList from '@/components/homelist/list'
export default {
  name: 'Home',
  components: {
    HomeHeader: Header,
    HomeConvas,
    HomeList
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
