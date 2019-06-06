<template>
  <div>
    <div class="image">
      <img :src="ArticleImage" alt="" srcset="" class="article-image" />
    </div>
    <div class="placeholder"></div>
    <div class="article-content">
      <p class="title">title</p>
      <div class="content">
       this is content
      </div>
    </div>
  </div>
</template>
<script>
import ArticleImage from '@/assets/images/article.png'
export default {
  name: 'Article',
  data () {
    return {
      id: -1,
      ArticleImage
    }
  },
  methods: {

  },
  mounted () {
    this.id = this.$route.query.id
    console.log(this.$route.query)
  }
}
</script>
<style lang="stylus" scoped>
.placeholder
  height 150px
.image
  .article-image
    position fixed
    width 100%
    height 700px
    object-fit cover
.article-content
  opacity 0.9
  margin 50px 20%
  @media screen and (max-width: 1000px)
    margin 50px 10px
  background-color #ffffff
  padding 10px
  box-shadow 0 0 .4rem .2rem rgba(236, 240, 241,1.0)
  .title
    text-align center
    font-size 40px
  .content
    font-size 20px
</style>
