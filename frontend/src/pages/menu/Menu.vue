<template>
  <div style="height: 100vh;">
    <v-layout style="background: none; margin-bottom: 1rem; margin-top: 0.7rem;">
      <img style="height: 3rem; margin-left: 27vw;" src="../../../public/reborn-logo.png" />

            <span style="color: #505050; font-family: 'Poiret One', cursive; font-weight: bold; font-size: 2rem; padding-top: 0.5rem; display: inline-block; line-height: normal; vertical-align: middle;">Re-born</span>
        </v-layout>
        <div>
            <img :src="user.photoURL" style="height: 4rem; border-radius: 50%"/>
        </div>
        <div>
            <p>{{user.displayName}}</p>
        </div>
        <v-divider/>
        <v-btn v-for="item in items" :key="item.title"
            color="#DDEAD3"
            flat
            @click="actFunc(item.title, item.path)"
        >
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
        </v-btn>
    </div>
    <div>
      <p>{{user.displayName}}</p>
    </div>
    <v-divider />
    <v-btn v-for="item in items" color="#DDEAD3" flat @click="actFunc(item.title, item.path)">
      <v-icon left>{{item.icon}}</v-icon>
      {{item.title}}
    </v-btn>
  </div>
</template>

<script>
import FirebaseServices from "../../services/FirebaseServices.js";
import firebase from "firebase";
import router from "../../router";

export default {
  name: "Menu",
  data() {
    return {
      user: {
        photoUrs: 0,
        displayName: 0
      },
      state: null,
      items: [
        { title: "my page", icon: "dashboard", path: "" },
        { title: "recycle", icon: "eco", path: "" },
        { title: "connect", icon: "question_answer", path: "" },
        { title: "log out", icon: "account_box", path: "" }
      ]
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = firebase.auth().currentUser;
    },
    actFunc(title, path) {
      if (title == "log out") {
        let tmp = FirebaseServices.logoutUser();
        router.push("/sign");
      } else {
        router.push(path);
      }
    }
  }
};
</script>

<style>
html {
  background-color: #ddead3;
}
</style>
