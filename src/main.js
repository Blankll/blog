// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './utils/Axios'
import './assets/styles/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'typeface-roboto'
import Highlight from './utils/codelight'
import './assets/styles/highlight.css'
Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(Highlight)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
