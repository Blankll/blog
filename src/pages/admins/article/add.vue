<template>
  <div class="root">
    <mu-container class="article">
      <mu-form :model="article" class="mu-demo-form" label-position="left" label-width="100">
        <mu-form-item prop="input" label="标题">
          <mu-text-field v-model="article.title"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="slider" label="图片">
          <input type="file" @change="getFile">
            <img :src="selectedImage" alt="选择图片" class="thumb-image">
        </mu-form-item>
        <mu-form-item prop="slider" label="内容">
          <div ref="editorElem" style="min-height:400px; width:100%"></div>
        </mu-form-item>
        <mu-form-item prop="checkbox" label="标签">
          <mu-checkbox v-model="article.tags" v-for="item of tags" :key="item.id" :value="item.id" :label="item.name"></mu-checkbox>
        </mu-form-item>
      </mu-form>
      <mu-button color="primary" @click="articleSubmit()">提交</mu-button>
    </mu-container>
  </div>
</template>
<script>
import E from 'wangeditor'
import { config } from '@/assets/config'
export default {
  name: 'AdminArticleAdd',
  data () {
    return {
      prefix: config.prefix,
      tags: [],
      article: {
        title: '',
        imgurl: '',
        content: '',
        tags: []
      },
      selectedImage: ''
    }
  },
  methods: {
    getTags () {
      this.$axios.get('/api/tag')
        .then(res => {
          this.tags = res.data
        })
        .catch(err => console.log(err))
    },
    articleSubmit () {
      this.$axios.post('/api/article', this.article)
        .then(res => this.$router.push({ path: '/admin/article' }))
        .catch(err => console.log(err))
    },
    getFile (e) {
      const file = e.target.files[0]
      // image validation
      let arr = file.type.split('/')
      let valid = arr[0] === 'image' && (arr[1] === 'png' || arr[1] === 'jpg' || arr[1] === 'jpeg')
      if (!valid) {
        alert('选择图片格式错误')
        return
      }
      this.article.imgurl = file
      // show selected image
      let reader = new FileReader()
      let that = this
      reader.onload = function () {
        that.selectedImage = this.result
      }
      reader.readAsDataURL(file)
    },
    setEditor () {
      let wEditor = new E(this.$refs.editorElem)
      wEditor.customConfig.onchange = () => {
        this.article.content = wEditor.txt.html()
      }
      // debug keep close on product ready
      wEditor.customConfig.debug = true
      wEditor.customConfig.customUploadImg = (files, insert) => {
        this.$axios.post('/api/article/storeimage', { imgurl: files[0] })
          // insert to the article and db image url
          .then(res => insert(this.prefix + res.data.imgurl))
      }
      this.editor = wEditor
      this.editor.create()
    }
  },
  mounted () {
    this.setEditor()
    this.getTags()
  }
}
</script>
<style lang="stylus" scoped>
.root
  max-width 100%
  overflow hidden
.article
  padding-top 100px
  padding-left 20px
  .thumb-image
    max-width 100px
    max-height 100px
    object-fit cover
</style>
