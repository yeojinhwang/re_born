import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import firebaseApp from "firebase/app";
import Sign from "./pages/sign/Sign.vue";

import camera from "./pages/camera/main.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "camera",
      component: camera
    },
    {
      path: "/sign",
      name: "Sign",
      component: Sign
    }
  ]
});
