<template>
  <div class="root">
    <div class="left" :class="{leftshow: sideStatus}">
      <admin-home-left></admin-home-left>
    </div>
    <div class="body">
      <div class="top">
        <admin-home-top @sideBarStatus="getsideBarStatus"></admin-home-top>
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
  },
  data () {
    return {
      sideStatus: true
    }
  },
  methods: {
    getsideBarStatus (status) {
      this.sideStatus = status
    }
  }
}
</script>
<style lang="stylus" scoped>
.root
  display flex
  min-height 100vh
  .left
    width 0px
    min-height 100vh
  .leftshow
    width 20%
  .body
    display flex
    flex-direction column
    min-height 100vh
    width 100% !important
    .top
      width 100%
    .center
      width 100%;
</style>
