<template>
  <div>
    <home-convas></home-convas>
    <home-list :articles="articles"></home-list>
    <page-footer></page-footer>
  </div>
</template>
<script>
import HomeConvas from '@/components/convas/convas'
import HomeList from './components/list'
import PageFooter from '@/components/footer/footer'
export default {
  name: 'HomePage',
  components: {
    HomeConvas,
    HomeList,
    PageFooter
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
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

</style>
