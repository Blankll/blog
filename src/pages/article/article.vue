<template>
  <div>
    <div class="image">
      <img :src="prefix + article.imgurl" alt="" srcset="" class="article-image" />
    </div>
    <div class="placeholder"></div>
    <mu-alert color="error" v-if="errorText">{{ errorText }}</mu-alert>
    <div class="article-content">
      <p class="title">{{article.title}}</p>
      <div>
        <p class="create-date">{{article.created_at}}</p>
        <tag-list :tags="article.tag"></tag-list>
      </div>
      <div class="content">
       <span v-html="article.content" v-highlight></span>
      </div>
      <div class="article-status-group">
        <mu-button color="purple" @click="zan">
          <mu-icon value="thumb_up" left></mu-icon>{{article.zan}}
        </mu-button>
        <div class="share">
          <div class="fl">分享到：</div>
            <div @click="shareTo('qzone')">
                <img src="http://zixuephp.net/static/images/qqzoneshare.png" width="30">
            </div>
            <div @click="shareTo('qq')">
                <img src="http://zixuephp.net/static/images/qqshare.png" width="32">
            </div>
            <div @click="shareTo('sina')">
                <img src="http://zixuephp.net/static/images/sinaweiboshare.png" width="36">
            </div>
            <div @click="shareTo('wechat')">
                <img src="http://zixuephp.net/static/images/wechatshare.png" width="32">
            </div>
        </div>
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
                <mu-button flat @click="replyContent(item)">回复</mu-button>
              </div>
            </div>
            <div>
              <p class="comment-content">{{item.content}}</p>
              <reply
              v-if="replyItem.commentId==-1 && replyItem.shown===item.id"
              :replyItem="replyItem"
              @replyStatusChange="replyStatusChange"></reply>
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
                    <mu-button flat @click="replyContent(reply)">回复</mu-button>
                  </div>
                </div>
                <p class="comment-content">{{reply.content}}</p>
                <reply
                v-if="replyItem.commentId==item.id && replyItem.shown===reply.id"
                :replyItem="replyItem"
                @replyStatusChange="replyStatusChange"></reply>
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
import Reply from './components/reply'
import TagList from '../home/components/tagList'
export default {
  name: 'Article',
  components: {
    LoginDialog,
    Reply,
    TagList
  },
  data () {
    return {
      prefix: config.prefix,
      id: this.$route.params.id,
      article: {},
      content: '',
      comments: {},
      errorText: '',
      replyItem: {
        shown: -1,
        commentId: -1, // reply 存储父comment的id comment忽略此项,
        item: null // 保存要回复的目标的记录 props到reply module中
      },
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
    /**
     * 点击评论发布和textare focus时检测用户是否登录
     */
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
    },
    /**
     * 显示评论回复和回复回复框
     */
    replyContent (item) {
      if (!localStorage.getItem('token')) {
        this.loginProps.isShown = true
      }
      if (Number.parseInt(localStorage.getItem('scope')) !== 2) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('scope')
        this.loginProps.isShown = true
      }
      this.replyItem.shown = item.id
      this.replyItem.item = item
      if (item.userd) {
        this.replyItem.commentId = item.comment_id
      } else {
        this.replyItem.commentId = -1
      }
    },
    /**
     * 处理评论回复和回复回复结果
     */
    replyStatusChange (status) {
      if (status.status === 'failure') {
        this.errorText = status.message
        return
      }
      this.replyItem.shown = -1
      this.replyItem.commentId = -1
      this.replyItem.item = null
      if (status.status === 'confirm') { this.getComments() }
    },
    zan () {
      if (!localStorage.getItem('token')) {
        this.loginProps.isShown = true
        return
      }
      this.$axios.post('/api/zan', {
        type: 1,
        typed_id: this.id
      })
        .then(res => {
          if (res.data.status === 0) { this.article.zan -= 1 }
          if (res.data.status === 1) { this.article.zan += 1 }
        })
        .catch(err => { console.log(err) })
    },
    // 点击分享
    shareTo (type) {
      let logo = this.prefix + this.article.imgurl
      let title = this.article.title
      let desc = this.article.content.replace(/<[^>]+>/g, '').substring(0, 200)
      let href = window.location.href
      switch (type) {
        case 'qzone':
          window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${href}?sharesource=qzone&title=${title}&pics=${logo}&summary=${desc}`)
          break
        case 'qq':
          window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${href}?sharesource=qzone&title=${title}&pics=${logo}&summary=${desc}&desc=${desc}`)
          break
        case 'sina':
          break
        case 'wechat':
          break
      }
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
  .article-status-group
    width 90%
    margin 0px auto
    display flex
    justify-content space-around
    .share
      display flex
      div
        margin-left 10px
      div:hover
        cursor pointer
      div:nth-child(1)
        line-height 32px
        cursor auto
  .create-date
    text-align center
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
