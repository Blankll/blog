<template>
  <div>
    <home-convas></home-convas>
    <home-list></home-list>
    <page-footer></page-footer>
  </div>
</template>
<script>
import HomeConvas from '@/components/convas/convas'
import HomeList from './components/list'
import PageFooter from '@/components/footer/footer'
export default {
  name: 'HomePage',
  components: {
    HomeConvas,
    HomeList,
    PageFooter
  }
}
</script>
<style lang="stylus" scoped>

</style>
