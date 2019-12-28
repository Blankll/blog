<template>
  <div>
    <mu-container>
      <mu-dialog width="760" transition="slide-bottom" :open.sync="loginProps.isShown">
        <mu-appbar color="primary" title="Login">
          <mu-button slot="left" icon @click="statusChange('close')">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat  @click="statusChange('confirm')">
            Done
          </mu-button>
        </mu-appbar>
         <mu-alert color="error" v-if="alertError"> {{ alertError }}</mu-alert>
        <div class="login-box">
          <div class="phone-box">
            <div class="input-phone-box">
              <mu-text-field v-model="loginForm.phone" :disabled="disabledBntAval" type="text" placeholder="请输入电话号码" icon="phone"></mu-text-field><br/>
            </div>
            <mu-button flat @click="sendSMS" :disabled="disabledBntAval">{{smsText}}</mu-button>
          </div>
          <div>
            <mu-text-field v-model="loginForm.code"  icon="comment"  placeholder="请输入验证码"></mu-text-field>
          </div>
          <mu-button color="primary" @click="login"> 登&nbsp;&nbsp;&nbsp;&nbsp;录 </mu-button>
        </div>
      </mu-dialog>
    </mu-container>
  </div>
</template>
<script>
import Token from '@/utils/token'
export default {
  name: 'LoginDialog',
  props: ['loginProps'],
  data () {
    return {
      loginForm: {
        phone: '',
        code: ''
      },
      secondes: 60,
      interVal: null,
      smsText: '发送短信',
      alertError: '',
      disabledBntAval: false
    }
  },
  methods: {
    statusChange (status = 'close') {
      console.log(status)
      this.$emit('loginEmit', { status: status })
    },
    sendSMS () {
      if (!this.loginForm.phone) { return }
      this.$axios.post('/api/user/authsms', this.loginForm)
        .then(res => {
          this.disabledBntAval = true
          this.secondes = 60
          this.interVal = setInterval(() => {
            if (this.secondes > 0) { this.secondes -= 1 } else {
              this.disabledBntAval = false
              this.smsText = '发送短信'
              clearInterval(this.interVal)
            }
            this.smsText = this.secondes
          }, 1000)
        })
        .catch(err => {
          this.disabledBntAval = false
          console.log(err)
          this.alertError = err.messages[0]
          clearInterval(this.interVal)
        })
    },
    login () {
      if (!this.loginForm.phone || !this.loginForm.code) { return }
      this.$axios.post('/api/user/login', this.loginForm)
        .then(res => {
          Token.setToken(res.data.token, res.data.scope)
          this.statusChange('success')
        })
        .catch(err => { this.alertError = err.messages[0] })
        .finally(() => { this.disabledBntAval = false })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-box
  padding 25px
  width 100%
  .phone-box
    display flex
.login-box>div
  margin 20px
</style>
