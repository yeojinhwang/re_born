<template>
  <div>
    <Header/>
    <div style="height: 100vh;">

    </div>
  </div>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import firebase from 'firebase'
import router from '../../router'

import Header from '../../components/Header.vue'

export default {
  name: 'test',
  data () {
    return {
      user: null
    }
  },
  components: {
    Header
  },
  mounted() {
  },
  methods: {
    async googleLogin() {
      let tmp = await FirebaseServices.loginUserWithGoogle()
      let temp = firebase.auth().onAuthStateChanged(function(user) {
        console.log(user)
      })
    }
  }
}
</script>

<style>
  .google-button {
    height: 40px;
    border-width: 0;
    background: white;
    color: #737373;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: 1px 1px 0px 1px rgba(0,0,0,0.05);
    transition-property: background-color, box-shadow;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    padding: 0;
    
    &:focus,
    &:hover {
      box-shadow: 1px 4px 5px 1px rgba(0,0,0,0.1);
    }
    
    &:active {
      background-color: #e5e5e5;
      box-shadow: none;
      transition-duration: 10ms;
    }
  }
      
  .google-button__icon {
    display: inline-block;
    vertical-align: middle;
    margin: 8px 0 8px 8px;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
  }

  .google-button__icon--plus {
    width: 27px;
  }

  .google-button__text {
    display: inline-block;
    vertical-align: middle;
    padding: 0 24px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto',arial,sans-serif;
  }
</style>
