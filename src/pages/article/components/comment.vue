<template>
  <div>
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
  </div>
</template>
<script>
export default {
  name: 'Comment'
}
</script>
<style lang="stylus" scoped>

</style>
