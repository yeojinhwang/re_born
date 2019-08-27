import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'

import router from '../router'
import store from '../store'

const firebaseConfig = {
    apiKey: "AIzaSyB7BDC4zo1QEInT-LhEZgaNt9pbXhDeN3g",
    authDomain: "reborn-4c850.firebaseapp.com",
    databaseURL: "https://reborn-4c850.firebaseio.com",
    projectId: "reborn-4c850",
    storageBucket: "reborn-4c850.appspot.com",
    messagingSenderId: "362958430568",
    appId: "1:362958430568:web:b50613f82bc57ede"
}

firebase.initializeApp(firebaseConfig)

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

const db = firebase.firestore()

export default {
    
}