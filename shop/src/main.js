import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import VueCarousel from 'vue-carousel'

import './assets/scss/main.scss'

Vue.use(VueCarousel)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
