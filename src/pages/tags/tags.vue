<template>
  <div class="root">
    <div class="tags-box">
      <mu-container  class="tags-exists-box">
        <p>tags</p>
        <mu-chip class="chip-item"
          v-for="tag in tags"
          :key="tag.id"
          :color="colors[tag.id % colors.length]"
          :selected="tag.selected" @click="selectedChage(tag)">
          {{tag.name}}
        </mu-chip>
      </mu-container>
    </div>
    <div class="article-list-box">
      <div v-for="item in list" :key="item.id">
        <p>{{item.name}}</p>
        <mu-container class="card">
          <mu-card v-for="article in item.article" :key="article.id" class="item">
            <div class="card-header">
              <mu-card-title :title="article.title" @click="checkOut(article)"></mu-card-title>
            </div>
            <div class="card-body">
              <div class="body-image">
                <!-- <mu-card-media title="Image Title"> -->
                <mu-card-media :title="article.created_at">
                  <img :src="prefix + article.imgurl" class="image">
                </mu-card-media>
              </div>
              <div class="body-content" @click="checkOut(article)">
                <span v-html="article.content"></span>
              </div>
              <div class="clear-both"></div>
            </div>
            <div class="card-footer">
              <!-- <div class="time">
                <p>CREATED: <span>{{article.created_at}}</span></p>
                <p>UPDATED: <span>{{article.updated_at}}</span></p>
              </div> -->
            </div>
          </mu-card>
        </mu-container>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  data () {
    return {
      colors: ['primary', 'secondary', 'success', 'warning', 'info', 'error'],
      tags: [],
      list: [],
      selectedIds: []
    }
  },
  methods: {
    getTags () {
      this.$axios.get('/api/tag')
        .then(res => {
          this.tags = res.data
          if (this.tags && this.tags.length) {
            this.selectedIds.push(this.tags[0].id)
            this.getArticlesByTag()
          }
        })
        .catch(err => { console.log(err) })
    },
    getArticlesByTag () {
      let ids = ''
      this.selectedIds.forEach(el => { ids = ids !== '0' && ids ? `${ids},${el}` : `${el}` })
      this.$axios.get(`/api/tag/article/${ids}`)
        .then(res => {
          console.log('res', res)
          this.list = res.data
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    console.log('tags mounted')
    this.getTags()
  }
}
</script>
<style lang="stylus" scoped>
.root
  padding-top 70px
  .tags-exists-box
    text-align left
  .chip-item
    margin 15px
    vertical-align middle
    font-size 20px
</style>
