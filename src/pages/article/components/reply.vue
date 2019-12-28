<template>
  <div>
    <div class="comment-div">
      <textarea class="comment-text-area" v-model="content"></textarea>
      <div class="comment-button-group">
        <mu-button @click="statusChange('cancel')" color="red" class="comment-button-item">
          CANCEL
          <mu-icon right value="delete"></mu-icon>
        </mu-button>
        <mu-button @click="statusChange('confirm')" color="blue">
          PUBLISH
          <mu-icon right value="send"></mu-icon>
        </mu-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Reply',
  props: ['replyItem'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    statusChange (status) {
      if (status === 'cancel') {
        this.$emit('replyStatusChange', { status: status })
      }
      if (status === 'confirm') {
        let param = {
          comment_id: this.replyItem.shown,
          to_user_id: this.replyItem.item.user.id,
          content: this.content,
          type: 1 // 回复评论
        }
        if (this.replyItem.item.userd) {
          param.type = 2 /* 回复回复 */
          param.comment_id = this.replyItem.commenId
        }
        this.$axios.post('/api/reply', param)
          .then(res => {
            this.$emit('replyStatusChange', { status: 'confirm' })
          })
          .catch(err => {
            this.$emit('replyStatusChange', {
              status: 'failure', message: err.messages[0]
            })
          })
      }
    }
  },
  mounted () { }
}
</script>
<style lang="stylus" scoped>
.comment-text-area
  width 100%
  height 100px
.comment-button-group
  margin-top 10px
  display flex
  justify-content flex-end
  .comment-button-item
    margin-right 10px
</style>
