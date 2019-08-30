import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
