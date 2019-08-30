<template>
    <v-container justify-center align-content-center>
        <div>
            <img :src="user.photoURL" style="height: 4rem; border-radius: 50%"/>
        </div>
        <div>
            <p>{{user.displayName}}</p>
        </div>
        <v-btn v-for="item in items"
            color="#DDEAD3"
            flat
            @click="actFunc(item.title, item.path)"
        >
            <v-icon left>{{item.icon}}</v-icon>
        </v-btn>
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
            state: null,
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
        },
        actFunc(title, path) {
            if (title == 'log out') {
                let tmp = FirebaseServices.logoutUser()
            } else {
                router.push(path)
            }
        }
    }
}
</script>

<style>
    html {
        background-color: #DDEAD3;
    }
</style>
