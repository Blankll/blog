// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUI from 'muse-ui'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Highlight from './utils/codelight'
import 'muse-ui/dist/muse-ui.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/index.css'
import 'typeface-roboto'
import './assets/styles/highlight.css'
import './utils/Axios'
import router from './router'
Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(Highlight)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
