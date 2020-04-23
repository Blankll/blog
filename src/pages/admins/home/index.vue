<template>
  <div class="card-root">
    <b-card border-variant="info" class="text-center">
      <template v-slot:header>
        <div>USERS&nbsp;
          <b-badge pill variant="success" v-if="counts.user.new > 0">{{counts.user.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.user.count}}</b-card-text>
    </b-card>
    <b-card border-variant="info" class="text-center">
      <template v-slot:header>
        <div>ARTICLES&nbsp;
          <b-badge pill variant="success" v-if="counts.article.new > 0">{{counts.article.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.article.count}}</b-card-text>
    </b-card>
    <b-card border-variant="info" class="text-center">
      <template v-slot:header>
        <div>TAGS&nbsp;
          <b-badge pill variant="success" v-if="counts.tag.new > 0">{{counts.tag.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.tag.count}}</b-card-text>
    </b-card>
    <b-card  border-variant="info" class="text-center">
      <template v-slot:header>
        <div>LIKES&nbsp;
          <b-badge pill variant="success" v-if="counts.like.new > 0">{{counts.like.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.like.count}}</b-card-text>
    </b-card>
    <b-card  border-variant="info" class="text-center">
      <template v-slot:header>
        <div>COMMENTS&nbsp;
          <b-badge pill variant="success" v-if="counts.comment.new > 0">{{counts.comment.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.comment.count}}</b-card-text>
    </b-card>
    <b-card  border-variant="info" class="text-center">
      <template v-slot:header>
        <div>REPLIES&nbsp;
          <b-badge pill variant="success" v-if="counts.reply.new > 0">{{counts.reply.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.reply.count}}</b-card-text>
    </b-card>
    <b-card  border-variant="info" class="text-center">
      <template v-slot:header>
        <div>BROWSERS&nbsp;
          <b-badge pill variant="success" v-if="counts.browser.new > 0">{{counts.browser.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.browser.count}}</b-card-text>
    </b-card>
    <b-card  border-variant="info" class="text-center">
      <template v-slot:header>
        <div>RECORDS&nbsp;
          <b-badge pill variant="success" v-if="counts.record.new > 0">{{counts.record.new}}</b-badge>
        </div>
      </template>
      <b-card-text>{{counts.record.count}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      counts: []
    }
  },
  methods: {
    getCounts () {
      this.$axios.get('/api/admin/count')
        .then(res => { this.counts = res.data })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getCounts()
  }
}
</script>

<style lang="stylus" scoped>
.card-root
  display flex
  flex-wrap wrap
  margin 20px
  .card
    margin 20px
    max-width 300px
    min-width 200px
    .card-text
      font-size 50px
      font-weight bolder
    .card-header
      background-color none
</style>
