import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import firebaseApp from "firebase/app";
import Sign from "./pages/sign/Sign.vue";
import Complaints from "./pages/complaints/Complaints.vue";
import Report from "./pages/complaints/Report.vue";
import ReportCard from "./pages/complaints/components/ReportCard.vue";
import Search from "./pages/complaints/components/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/sign",
      name: "Sign",
      component: Sign
    },
    {
      path: "/complaints",
      name: "Complaints",
      component: Complaints
    },
    {
      path: "/report",
      name: "Report",
      component: Report
    }
  ]
});
