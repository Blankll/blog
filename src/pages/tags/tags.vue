<template>
  <div class="root">
    <div class="tags-box">
      <mu-container  class="tags-exists-box">
        <p>tags</p>
        <mu-chip class="chip-item"
          v-for="tag in tags"
          :key="tag.id"
          :color="selectedIds.includes(tag.id) ? colors[tag.id % colors.length] : false"
          :selected="selectedIds.includes(tag.id)" @click="selectedChange(tag)">
          {{tag.name}}
        </mu-chip>
      </mu-container>
    </div>
    <div class="article-list-box">
      <home-list :articles="articles"></home-list>
    </div>
  </div>
</template>
<script>
import HomeList from '../home/components/list'
export default {
  name: 'Tags',
  components: {
    HomeList
  },
  data () {
    return {
      colors: ['primary', 'secondary', 'success', 'warning', 'info', 'error'],
      tags: [],
      articles: [],
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
      console.log(ids)
      this.$axios.get('/api/tag/article/' + ids)
        .then(res => { this.articles = res.data })
        .catch(err => console.log(err))
    },
    selectedChange (tag) {
      console.log(tag)
      if (this.selectedIds.includes(tag.id)) {
        this.selectedIds.splice(this.selectedIds.findIndex(el => el === tag.id), 1)
      } else {
        this.selectedIds.push(tag.id)
      }
      this.getArticlesByTag()
    }
  },
  mounted () {
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
