<template>
  <div class="home">
    <home-header></home-header>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/header'
export default {
  name: 'Home',
  components: {
    HomeHeader: Header
  },
  data () {
    return {
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
