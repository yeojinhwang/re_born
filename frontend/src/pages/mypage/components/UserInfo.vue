<template>
    <div>
        <center>
            <img 
                src="../../../assets/recycle.png"
                width="300"
                height="260"
                style=" border:2px solid white"
            />
            <img 
                :src="user.photoURL"
                width="200"
                height="200"
                id="user_img"
            />
            <br>
            <div id="percent"></div>
            <a class="relative_position" style="font-size: 30px">{{user.displayName}}</a>
        </center>
    </div>
</template>

<script>
export default {
    name: 'MyPage',
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
<style>
    #user_img {
        position: absolute;
        top: 150px;
        left: 90px;
        border-radius: 50%;
        float:center;
        z-index:10
    }
    .relative_position {
        position: relative;
        top: 100px;
    }
    #percent {
        height: 25px;
        background-color: black;
        z-index: 1000000;
        position: absolute;
        top: 300px;
    }
</style>