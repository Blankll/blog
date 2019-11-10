<template>
  <div>
    <mu-container>
      <mu-dialog width="360" transition="slide-bottom" :open.sync="loginProps.isShown">
        <mu-appbar color="primary" title="Fullscreen Diaolog">
          <mu-button slot="left" icon @click="statusChange('close')">
            <mu-icon value="close"></mu-icon>
          </mu-button>
          <mu-button slot="right" flat  @click="statusChange('confirm')">
            Done
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          this is a fullscreen dialog
        </div>
      </mu-dialog>
    </mu-container>
  </div>
</template>
<script>
export default {
  name: 'LoginDialog',
  props: ['loginProps'],
  data () {
    return {
      loginForm: {
        phone: '',
        code: ''
      }
    }
  },
  methods: {
    statusChange (status = 'close') {
      console.log(status)
      this.$emit('loginEmit', { status: status })
    }
  }
}
</script>
<style scoped>

</style>
