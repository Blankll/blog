<template>
  <div class="root">
    <div class="left">
      <admin-home-left></admin-home-left>
      <div class="left-holder"></div>
    </div>
    <div class="body">
      <div class="top">
        <admin-home-top></admin-home-top>
      </div>
      <div class="center">
        <router-view/>
      </div>
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
  display flex
  .left
    width 20%
    .left-holder
      height 500px
  .body
    width 100%
    .top
      width 100%
    .center
      width 100%;
</style>
