import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./registerServiceWorker";
import GAuth from "vue-google-oauth2";
import axios from "axios";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;
import VueSessionStorage from 'vue-sessionstorage'
Vue.use(VueSessionStorage)

Vue.use(Vuetify);
const gauthOption = {
  clientId:
    "25718941998-tp9dr97snqieperbnockj6elg2r2mr7n.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
