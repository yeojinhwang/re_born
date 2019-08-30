<template>
    <v-container justify-center align-content-center>
        <v-layout>
            <v-flex>
            <img :src="user.photoURL" style="height: 4rem; border-radius: 50%"/>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex class="text-center">
            <p>{{user.displayName}}</p>
            </v-flex>
        </v-layout>
        <v-layout v-for="item in items">
            <v-flex>
                <v-icon>{{item.icon}}</v-icon>
            </v-flex>
            <v-flex>
                <p>{{item.title}}</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices.js'
import firebase from 'firebase'

export default {
  name: 'Menu',
  data () {
    return {
        user: null,
        items: [
            {title: 'my page', icon: 'dashboard', path: ''},
            {title: 'recycle', icon: 'eco', path: ''},
            {title: 'connect', icon: 'question_answer', path: ''},
            {title: 'log out', icon: 'account_box', path: ''}
        ]
    }
  },
  mounted() {
      this.getUser()
  },
  methods: {
      getUser() {
          this.user = firebase.auth().currentUser;
          console.log(this.user)
      }
  }
}
</script>

<style>
    html {
        background-color: #DDEAD3;
    }
</style>
