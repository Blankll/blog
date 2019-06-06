<template>
  <div>
    <mu-container class="button-wrapper button-list">
      <mu-button color="primary" @click="articleAdd">添加</mu-button>
    </mu-container>
    <mu-paper :z-depth="1">
        <mu-data-table :columns="columns" :data="articles">
          <template slot-scope="scope">
            <td>{{scope.row.id}}</td>
            <td>{{scope.row.title}}</td>
            <td>{{scope.row.created_at}}</td>
            <td>{{scope.row.updated_at}}</td>
            <td>
              <mu-chip color="primary" v-if="scope.row.status == 1">未发布</mu-chip>
              <mu-chip color="success" v-if="scope.row.status == 2">已发布</mu-chip>
              <mu-chip color="blueGrey400" v-if="scope.row.status == 3">已下架</mu-chip>
              <mu-chip color="brown500" v-if="scope.row.status == 0">已删除</mu-chip>
            </td>
            <td>
              <mu-container class="button-wrapper">
                <mu-button color="indigo400" v-if="scope.row.status == 2" @click="articleDepublish(scope.row)">DEPUBLISH</mu-button>
                <mu-button color="primary" v-if="scope.row.status != 2" @click="articlePublish(scope.row)">PUBLISH</mu-button>
                <mu-button color="warning" @click="articleEdit(scope.row)">EDIT</mu-button>
                <mu-button color="error" @click="articleDelete(scope.row)">DELETE</mu-button>
              </mu-container>
            </td>
          </template>
        </mu-data-table>
      </mu-paper>
  </div>
</template>
<script>
export default {
  name: 'AdminArticle',
  data () {
    return {
      articles: [],
      columns: [
        { title: 'ID', width: 50, name: 'name' },
        { title: 'TITLE', name: 'calories', width: 290, align: 'center', sortable: true },
        { title: 'CREATE', name: 'fat', width: 120, align: 'center', sortable: true },
        { title: 'PUDATE', name: 'carbs', width: 120, align: 'center', sortable: true },
        { title: 'STATUS', name: 'protein', width: 90, align: 'center', sortable: true },
        { title: 'OPS', name: 'protein', width: 360, align: 'center', sortable: true }
      ]
    }
  },
  methods: {
    articleAdd () {
      this.$router.push({ path: '/admin/article/add' })
    },
    getArticles () {
      this.$axios.get('/api/article')
        .then(res => { this.articles = res.data })
        .catch(err => console.log(err))
    },
    articlePublish (item) {
      this.$axios.post('/api/article/publish/' + item.id)
        .then(res => { item.status = 2 })
        .catch(err => console.log(err))
    },
    articleDepublish (item) {
      this.$axios.post('/api/article/depublish/' + item.id)
        .then(res => { item.status = 3 })
        .catch(err => console.log(err))
    },
    articleEdit (item) {
      this.$router.push({ path: '/admin/article/edit', query: { id: item.id } })
    },
    articleDelete (item) {
      this.$axios.delete('/api/article/' + item.id)
        .then(res => { item.status = 0 })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
<style lang="stylus" scoped>
.button-list
  padding 20px
</style>
