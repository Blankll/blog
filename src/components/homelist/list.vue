<template>
  <mu-container class="card">
    <mu-card v-for="list in lists" :key="list" class="item">
      <div class="card-header">
        <mu-card-title title="Content Title"></mu-card-title>
      </div>
      <div class="card-body">
        <div class="body-image">
          <mu-card-media title="Image Title">
            <img :src="imgURL" class="image">
          </mu-card-media>
        </div>
        <div class="body-content">
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
            调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
            似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
            找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </div>
        <div class="clear-both"></div>
      </div>
      <div class="card-footer">
        <mu-button :color="colors[list]" v-for="list in lists" :key="list" class="tag">
          <mu-icon value="device_hub" left></mu-icon>BACK
        </mu-button>
      </div>
    </mu-card>
  </mu-container>

</template>
<script>
export default {
  name: 'HomeList',
  data () {
    return {
      lists: [0, 1, 2, 3, 4, 5],
      colors: ['primary', 'red', 'warning', 'darkBlack', 'purple'],
      imgURL: '/static/01.jpg'
    }
  }
}
</script>
<style lang="stylus" scoped>
.card
  margin-top 20px
  max-width 1900px
  width 90%
  height 100%
  @media (max-width 1000px) {
    width 100%
  }
  .item
    margin-top 17px
    .card-header
    .card-body
      .body-image
        float left
        margin-right 20px
        .image
          width 500px
          height 300px
          object-fit cover
      .body-content
        padding 0 15px
        font-size 20px
        line-height 40px
        text-indent 40px
    .card-footer
      .tag
        margin 10px
</style>
