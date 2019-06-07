<template>
  <mu-container class="card">
    <mu-card v-for="article in articles" :key="article.id" class="item">
      <div class="card-header">
        <mu-card-title :title="article.title" @click="checkOut(article)"></mu-card-title>
      </div>
      <div class="card-body">
        <div class="body-image">
          <!-- <mu-card-media title="Image Title"> -->
          <mu-card-media title="I">
            <img :src="prefix + article.imgurl" class="image">
          </mu-card-media>
        </div>
        <div class="body-content" @click="checkOut(article)">
          <span v-html="article.content"></span>
        </div>
        <div class="clear-both"></div>
      </div>
      <div class="card-footer">
        <mu-button
          v-for="tag in article.tag" :key="tag.id" class="tag"
          :color="colors[tag.id % colors.length]">
          <mu-icon value="device_hub" left></mu-icon>{{tag.name}}
        </mu-button>
      </div>
    </mu-card>
  </mu-container>

</template>
<script>
import { config } from '@/assets/config'
export default {
  name: 'HomeList',
  data () {
    return {
      prefix: config.prefix,
      articles: {},
      colors: ['primary', 'red', 'warning', 'darkBlack', 'purple']
    }
  },
  methods: {
    checkOut (item) {
      this.$router.push({ path: '/article', query: { id: item.id } })
    },
    getArticles () {
      this.$axios.get('/api/article/published')
        .then(res => { this.articles = res.data })
    }
  },
  mounted () {
    this.getArticles()
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
      cursor pointer
    .card-body
      .body-image
        float left
        // margin-right 20px
        .image
          width 500px
          height 300px
          object-fit cover
      .body-content
        padding 0 15px
        font-size 20px
        text-indent 40px
        max-height 270px
        overflow hidden
        // text-overflow ellipsis
        cursor pointer
    .card-footer
      .tag
        margin 10px
</style>
