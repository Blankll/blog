<template>
  <div>this is article page</div>
</template>
<script>
export default {
  name: 'Article',
  data () {
    return {
      id: -1
    }
  },
  methods: {

  },
  mounted () {
    this.id = this.$route.query.id
    console.log(this.$route.query)
  }
}
</script>
<style lang="stylus" scoped>

</style>
