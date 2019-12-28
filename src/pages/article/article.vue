<template>
  <div>
    <mu-alert color="error" v-if="errorText">{{ errorText }}</mu-alert>
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
        <textarea class="comment-text-area" @focus="comentOpsClick('focus')" v-model="content"></textarea>
        <div class="comment-button-group">
          <mu-button @click="comentOpsClick('cancel')" color="red" class="comment-button-item">
            CANCEL
            <mu-icon right value="delete"></mu-icon>
          </mu-button>
          <mu-button @click="comentOpsClick('confirm')" color="blue">
            PUBLISH
            <mu-icon right value="send"></mu-icon>
          </mu-button>
        </div>
      </div>
      <div class="comments-list">
        <p>ALL COMMENTS</p>
        <div v-for="item in comments.data" :key="item.id">
          <hr />
          <div class="comment-item">
            <div class="comment-item-head">
              <div class="head-left">
                <img :src="prefix + item.user.avatar_url" class="comment-avater">
                <p class="user-name">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.user.username }}</p>
              </div>
              <div class="head-right">
                <p class="user-date">{{ item.created_at }}</p>
                <mu-button flat @click="sendSMS">回复</mu-button>
              </div>
            </div>
            <div>
              <p class="comment-content">{{item.content}}</p>
            </div>
            <div class="replies">
              <div class="reply" v-for="reply in item.replies" :key="reply.id">
                <div class="reply-head">
                  <div>
                    <span class="user-name">{{reply.user.username}}</span>回复
                    <span class="user-name">{{reply.userd.username}}</span>:
                  </div>
                  <div>
                    <p class="user-date">{{reply.created_at}}</p>
                    <mu-button flat @click="sendSMS">回复</mu-button>
                  </div>
                </div>
                <p class="comment-content">{{reply.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-dialog
    v-if="loginProps.isShown"
    :login-props= "loginProps"
    @loginEmit="getLoginEmit"></login-dialog>
  </div>
</template>
<script>
import { config } from '@/assets/config'
import LoginDialog from '@/components/logindialog/loginDialog'
export default {
  name: 'Article',
  components: {
    LoginDialog
  },
  data () {
    return {
      prefix: config.prefix,
      id: this.$route.query.id,
      article: {},
      content: '',
      comments: {},
      errorText: '',
      loginProps: { isShown: false }
    }
  },
  methods: {
    getArticle () {
      this.$axios.get('/api/article/' + this.id)
        .then(res => { this.article = res.data })
    },
    getComments () {
      this.$axios.get('/api/article/' + this.id + '/comment')
        .then(res => { this.comments = res.data })
    },
    comentOpsClick (status) {
      if (status === 'cancel') { return (this.comment = '') }
      if (status === 'focus' && !localStorage.getItem('token')) {
        this.loginProps.isShown = true
      }
      if (status === 'confirm' && localStorage.getItem('token')) {
        if (!this.content) { return }
        this.loginProps.isShown = false
        this.$axios.post('/api/article/' + this.id + '/comment', {
          content: this.content,
          article_id: this.id
        })
          .then(res => { this.getComments() })
          .catch(err => { this.errorText = err.messages[0] })
      }
    },
    getLoginEmit (recv) {
      console.log('emit recv:', recv)
      this.loginProps.isShown = false
    }
  },
  mounted () {
    this.getArticle()
    this.getComments()
  }
}
</script>
<style lang="stylus" scoped>
.user-name
  color green
  margin 0px
  line-height 30px
.user-date
  margin 0px
  line-height 30px
.comment-content
  font-size 16px
  margin-top 0px
  text-indent 2em
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
    .comment-item
      .comment-item-head
        display flex
        justify-content space-between
        .head-left
          display flex
        .head-right
          display flex
        .comment-avater
          width 30px
          height 30px
          overflow hidden
          object-fit cover
          border-radius 50%
      .replies
        margin-left 20px
        .reply
          .reply-head
            display flex
            justify-content space-between
            div:nth-child(2)
              display flex
              margin-right 20px
</style>
