<template>
  <div>
    <div class="image">
      <img :src="prefix + article.imgurl" alt="" srcset="" class="article-image" />
    </div>
    <div class="placeholder"></div>
    <div class="article-content">
      <p class="title">{{article.title}}</p>
      <div class="content">
       <span v-html="article.content" v-highlight></span>
      </div>
    </div>
    <div class="comment-box">
      <div class="comment-div">
        <textarea class="comment-text-area"></textarea>
        <div class="comment-button-group">
          <mu-button color="red" class="comment-button-item">
            CANCEL
            <mu-icon right value="delete"></mu-icon>
          </mu-button>
          <mu-button color="blue">
            PUBLISH
            <mu-icon right value="send"></mu-icon>
          </mu-button>
        </div>
      </div>
      <div class="comments-list">
        <p>ALL COMMENTS</p>
      </div>
    </div>
  </div>
</template>
<script>
import { config } from '@/assets/config'
export default {
  name: 'Article',
  data () {
    return {
      prefix: config.prefix,
      id: this.$route.query.id,
      article: {}
    }
  },
  methods: {
    getArticle () {
      this.$axios.get('/api/article/' + this.id)
        .then(res => { this.article = res.data })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
<style lang="stylus" scoped>
.placeholder
  height 150px
.image
  z-index 1
  .article-image
    z-index 1
    position fixed
    width 100%
    height 700px
    object-fit cover
.article-content
  z-index 2
  margin 50px 20%
  @media screen and (max-width: 1000px)
    margin 50px 1px
  background-color #ffffff
  background:rgba(255,255,255,0.9)
  position relative
  padding 10px
  box-shadow 0 0 .01rem .1rem rgba(236, 240, 241, 1.0)
  .title
    text-align center
    font-size 30px
  .content
    font-size 20px
.comment-box
  z-index 2
  margin 50px 20%
  @media screen and (max-width: 1000px)
    margin 50px 1px
  background-color #ffffff
  background:rgba(255,255,255,0.9)
  position relative
  padding 10px
  box-shadow 0 0 .01rem .01rem rgba(236, 240, 241, 1.0)
  .comment-div
    width 90%
    height 200px
    margin 0 auto
    .comment-text-area
      width 100%
      height 100%
      border-radius 10px
      padding 10px
    .comment-button-group
      margin-top 10px
      display flex
      justify-content flex-end
      .comment-button-item
        margin-right 10px
  .comments-list
    width 90%;
    margin 0 auto
    margin-top 60px
    > p
      font-size 20px
</style>
