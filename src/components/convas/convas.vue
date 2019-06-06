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
      imgURL: '/static/one.jpg'
    }
  }
}
</script>
<style lang="stylus" scoped>
.convas
  width 100%
  height 400px
  @media (max-width 1000px) {
    height 230px
  }
  .img-box
    width 100%
    height 100%
    .img
      width 100%
      height 100%
      object-fit cover
</style>
