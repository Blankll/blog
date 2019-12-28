<template>
  <div>
    <mu-button
      v-for="tag in tags" :key="tag.id" class="tag"
      :color="colors[tag.id % colors.length]">
      <mu-icon value="device_hub" left></mu-icon>{{tag.name}}
    </mu-button>
  </div>
</template>
<script>
export default {
  name: 'TagList',
  props: ['tags'],
  data () {
    return {
      colors: ['primary', 'red', 'warning', 'darkBlack', 'purple']
    }
  }
}
</script>
<style lang="stylus" scoped>
.tag
  margin 10px
</style>
