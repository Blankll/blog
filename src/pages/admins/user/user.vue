<template>
  <div class="root">
    <mu-paper :z-depth="3" class="table-box">
      <mu-data-table :loading="isLoading" :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="users">
        <template slot-scope="scope">
          <td>{{scope.row.id}}</td>
          <td>{{scope.row.username}}</td>
          <td>{{scope.row.phone}}</td>
          <td>{{scope.row.email}}</td>
          <td>{{scope.row.created_at}}</td>
          <td>{{scope.row.updated_at}}</td>
          <td> </td>
        </template>
      </mu-data-table>
      <mu-flex justify-content="end" style="margin: 32px 0;">
        <mu-pagination raised :total="page_info.total" :current.sync="page_info.current" :page-size="page_info.per_page"></mu-pagination>
      </mu-flex>
    </mu-paper>
  </div>
</template>
<script>
export default {
  name: 'AdminUser',
  data () {
    return {
      users: [],
      isLoading: false,
      columns: [
        { title: 'ID', width: 50, name: 'id' },
        { title: 'USERNAME', name: 'username', width: 200, align: 'center', sortable: true },
        { title: 'PHONE', name: 'phone', width: 200, align: 'center', sortable: true },
        { title: 'EMAIL', name: 'email', width: 200, align: 'center', sortable: true },
        { title: 'CREATE', name: 'created_at', width: 170, align: 'center', sortable: true },
        { title: 'PUDATE', name: 'updated_at', width: 170, align: 'center', sortable: true },
        { title: 'OPS', name: 'protein', width: 252, align: 'center', sortable: true }
      ],
      sort: {
        name: '',
        order: 'asc'
      },
      page_info: {
        current: 1,
        total: 1,
        per_page: 12
      }
    }
  },
  methods: {
    getUsers (page = 1) {
      this.isLoading = true
      this.$axios.get('/api/user')
        .then(res => {
          this.users = res.data.data
          this.page_info.current = res.data.current_page
          this.page_info.total = res.data.total
          this.page_info.per_page = res.data.per_page
          console.log(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => { this.isLoading = false })
    },
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name])
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
<style lang="stylus" scoped>
.root
  margin 12px auto
  .table-box
    margin 0 atuo
</style>
