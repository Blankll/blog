<template>
  <div class="root">
    <div class="box">
      <div class="avatar">
        <img :src="imageUrl" alt="" srcset="" class="avatar-image">
      </div>
      <div class="info">
        <div>
          <p>github</p>
          <p>https://github.com/Blankll</p>
        </div>
        <div>
          <p>Email</p>
          <p>zilisheng1996@gamil.com</p>
        </div>
        <div>
          <p>twitter</p>
          <p>@zilisheng</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutMe',
  data () {
    return {
      imageUrl: '/static/logo.jpg'
    }
  }
}
</script>
<style lang="stylus" scoped>
.root
  padding-top 100px
  .box
    margin 0 auto
    @media (max-width 1000px) {
      width 90%
    }
    width 700px
    height 500px
    background #212121
    .avatar
      width 200px
      height 200px
      margin 0 auto
      padding-top 20px
    .avatar-image
      position absolute
      width 200px
      height 200px
      object-fit cover
      border-radius 50%
    .info
      margin 50px
      div
        margin 0 auto
        text-align center
        font-size 20px
        color #ffffff
        line-height 16px
</style>
