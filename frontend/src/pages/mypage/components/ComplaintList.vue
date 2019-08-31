<template >
    <v-container>
        <v-card v-for="complaint in user.complaints" :key="complaint.title">
            <v-list-item two-line>
                <v-list-item-content>
                    <!-- 리스트 타이틀, 서브타이틀 block 안됨 -->
                    <v-list-item-title>{{complaint.title}}</v-list-item-title>
                    <v-list-item-subtitle>{{complaint.content}}</v-list-item-subtitle>
                    <v-list-text>{{complaint.name}}</v-list-text>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: 'ComplaintList',
    data () {
        return {
            user : {}
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
<style scoped>
#a {
    position: absolute;
    top: 550px;
    left:130px
}
</style>