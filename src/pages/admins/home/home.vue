<template>
  <div class="root">
    <div class="left">
      <admin-home-left></admin-home-left>
      <div class="left-holder"></div>
    </div>
    <div class="top">
      <admin-home-top></admin-home-top>
    </div>
    <div class="center">
      <router-view/>
    </div>
  </div>
</template>
<script>
import AdminHomeLeft from './components/left'
import AdminHomeTop from './components/top'
export default {
  name: 'AdminHome',
  components: {
    AdminHomeLeft,
    AdminHomeTop
  }
}
</script>
<style lang="stylus" scoped>
.root
  .left
    float left
    width 20%
    .left-holder
      height 500px
  .top
    float left
    width 80%
  .center
    float left
</style>
