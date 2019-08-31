<template>
  <div>
    <div style="height: 100vh;">
      <v-layout style="background: none; margin-bottom: 1rem; margin-top: 0.7rem;">
        <img style="height: 3rem; margin-left: 25vw;" src="../../../public/reborn-logo.png" />

        <span
          style="color: #505050; font-family: 'Poiret One', cursive; font-weight: bold; font-size: 2rem; padding-top: 0.5rem; display: inline-block; line-height: normal; vertical-align: middle;"
        >Re-born</span>
      </v-layout>
      <div>
        <img :src="user.photoURL" style="height: 4rem; border-radius: 50%" />
        <span>{{user.displayName}}</span>
        <span>{{user.level}}</span>
      </div>
      <v-divider />
      <v-btn
        v-for="item in items"
        :key="item.title"
        color="#DDEAD3"
        flat
        @click="actFunc(item.title, item.path)"
      >
        <v-icon left>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
    </div>
  </div>
</template>

<script>
import FirebaseServices from "../../services/FirebaseServices.js";
import firebase from "firebase";
import router from "../../router";

export default {
    name: 'Menu',
    data () {
        return {
            user: {},
            userId : '',
            items: [
                {title: 'my page', icon: 'dashboard', path: '/mypage'},
                {title: 'recycle', icon: 'eco', path: '/camera'},
                {title: 'connect', icon: 'question_answer', path: '/complaints'},
                {title: 'log out', icon: 'account_box', path: ''}
            ]
        }
    },
    mounted() {
        this.getUser()
    },
    methods : {
        async getUser() {
            this.userId = await firebase.auth().currentUser.uid
            console.log(this.userId)
            this.user = await FirebaseServices.getFirebaseUser(this.userId)
            console.log(this.user)
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
    
  }

</script>

<style>
html {
  background-color: #ddead3;
}
</style>
