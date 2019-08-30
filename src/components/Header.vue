<template>
    <div>
        <v-toolbar
        absolute
        color="teal lighten-3"
        dark
        scroll-off-screen
        scroll-target="#scrolling-techniques"
        >
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices.js'
import firebase from 'firebase'

export default {
  name: 'Header',
  data () {
    return {
      user: null
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

