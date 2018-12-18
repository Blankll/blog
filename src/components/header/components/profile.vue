<template>
  <div>
     <mu-menu>
       <div class="profile">
        <img :src="imageUrl" alt="nation" class="nation-image">
       </div>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Profile</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-content>
            <mu-list-item-title>Login Out</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
     </mu-menu>
  </div>
</template>
<script>
export default {
  name: 'Profile',
  data () {
    return {
      imageUrl: '/static/logo.jpg'
    }
  }
}
</script>
<style lang="stylus" scoped>
.profile
  width 40px
  height 40px
  margin 10px
  .nation-image
      position absolute
      width 40px
      height 40px
      object-fit cover
      border-radius 50%
</style>
