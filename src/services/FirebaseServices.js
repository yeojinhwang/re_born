import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/firestore";

import router from "../router";
import store from "../store";

const firebaseConfig = {
  apiKey: "AIzaSyB7BDC4zo1QEInT-LhEZgaNt9pbXhDeN3g",
  authDomain: "reborn-4c850.firebaseapp.com",
  databaseURL: "https://reborn-4c850.firebaseio.com",
  projectId: "reborn-4c850",
  storageBucket: "reborn-4c850.appspot.com",
  messagingSenderId: "362958430568",
  appId: "1:362958430568:web:b50613f82bc57ede"
};

firebase.initializeApp(firebaseConfig);

// firebase 인승상태 지속성
// login 시 페이지 로드가 한번 일어남으로 NONE으로 설정하면 인증이 해제됨

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const db = firebase.firestore();

export default {
  // login with google
  loginUserWidthGoogle() {
    let _this = this;
    let provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRedirectResult()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        if (result.additionalUserInfo.isNewUser) {
          _this.createdForNewUser(
            result.user.uid,
            "20190830",
            result.user.displayName
          );
        }
      })
      .catch(function(error) {
        console.log(error.code, error.message);
      });
  },
  // logout
  logoutUser() {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .then(sessionStorage.clear())
      .then(router.push("/"))
      .catch(function(error) {
        console.log(error);
      });
  }
};
