<template>
  <div class="convas">
    <div class="img-box">
      <img :src="imgURL" alt="homeconvas" class="img">
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeConvas',
  data () {
    return {
      imgURL: '/static/logo.jpg'
    }
  }
}
</script>
<style lang="stylus" scoped>
.convas
  width 100%
  height 200px
  .img-box
    width 100%
    height 100%
    .img
      width 100%
      height 100%
      object-fit cover
</style>
