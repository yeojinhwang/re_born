<template>
  <div>
    <div style="height: 100vh;">
      <v-layout style="background: none; margin-bottom: 1rem; margin-top: 0.7rem;">
        <img style="height: 3rem; margin-left: 25vw;" src="../../../public/reborn-logo.png" />

        <span
          id="reborn"
        >Re-born</span>
      </v-layout>
      <div >
        <img :src="user.photoURL" id="userImg" style="margin-left: 150px; border-radius: 50%" />
      </div>
      <v-divider />
      <div id="btnPosition">
        <v-btn
            v-for="item in items"
            :key="item.title"
            color="#DDEAD3"
            class="linkBtn"
            flat
            @click="actFunc(item.title, item.path)"
        >
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
        </v-btn>
      </div>
    </div>
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
      },
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
    this.getUserId();
    
  },
  methods: {
     getUserId() {
      let _this = this;
      // this.user = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          _this.user = user;
          console.log(_this.user);
        }
      })
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
#reborn {
    color: #505050;
    font-family: 'Poiret One', cursive; 
    font-weight: bold; 
    font-size: 2rem; 
    padding-top: 0.5rem; 
    display: inline-block; 
    line-height: normal; 
    vertical-align: middle;
}
#userImg {
    width: 150px;
    height: 150px;
    margin-top : 20px;
    position : absolute;
    left: -40px;
}
.linkBtn {
    width: 155px;
    height : 155px;
    margin : 16px 16px 16px 16px;
    z-index : -1
    
}
#btnPosition {
    position : absolute;
    top: 260px;
    left: 1px;
}
</style>
