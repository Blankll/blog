<template>
  <div class="root">
    <mu-container class="button-wrapper button-list">
      <mu-button color="primary" @click="tagAdd">添加</mu-button>
    </mu-container>
      <mu-paper :z-depth="1">
        <mu-data-table :columns="columns" :data="tags">
          <template slot-scope="scope">
            <td>{{scope.row.id}}</td>
            <td class="is-right">{{scope.row.name}}</td>
            <td class="is-right">{{scope.row.created_at}}</td>
            <td class="is-right">{{scope.row.updated_at}}</td>
            <td class="is-right">
              <mu-container class="button-wrapper">
                <mu-button color="warning">EDIT</mu-button>
                <mu-button color="error">DELETE</mu-button>
              </mu-container>
            </td>
          </template>
        </mu-data-table>
      </mu-paper>
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openEdit">
        <mu-appbar color="primary" title="Fullscreen Diaolog">
          <mu-button slot="left" icon @click="openEdit = false">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat  @click="openEdit = false">
            Done
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          <mu-form :model="tag" class="mu-demo-form" label-position="left" label-width="100">
            <mu-form-item prop="input" label="名称">
              <mu-text-field v-model="tag.name"></mu-text-field>
            </mu-form-item>
          </mu-form>
          <mu-button color="primary" @click="submitTag">提交</mu-button>
        </div>
      </mu-dialog>
  </div>
</template>
<script>
export default {
  name: 'AdminTag',
  data () {
    return {
      tag: {
        name: ''
      },
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [
        { title: 'ID', width: 50, name: 'name' },
        { title: 'TITLE', name: 'calories', width: 200, align: 'center', sortable: true },
        { title: 'CREATE', name: 'fat', width: 170, align: 'center', sortable: true },
        { title: 'PUDATE', name: 'carbs', width: 170, align: 'center', sortable: true },
        { title: 'OPS', name: 'protein', width: 252, align: 'center', sortable: true }
      ],
      tags: [],
      openEdit: false
    }
  },
  methods: {
    tagAdd () {
      this.openEdit = true
    },
    getTags () {
      this.$axios.get('/api/tag')
        .then(res => { this.tags = res.data })
        .then(err => console.log(err))
    },
    submitTag () {
      this.$axios.post('/api/tag', this.tag)
        .then(res => {
          this.tags.push(res.data)
          this.openEdit = false
        })
    }
  },
  mounted () {
    this.getTags()
  }
}
</script>
<style lang="stylus" scoped>
.root
  .button-list
    padding 30px
</style>
