<template>
    <container>
        <h1>{{userPoint}}</h1>
        <v-btn>Button</v-btn>
 

        <button @click="pointProgress">click</button>
    </container>    
</template>
<script>
export default {
    name: 'UserExp',
    data () {
        return {
            user : {
                displayName: 'username',
                points: 1700,
                level: 'bronze',
                photoURL: 'https://picsum.photos/id/11/300/300',
                complaints : {
                    1 : {
                        writer : 'username',
                        content : '환경을 위해 유색 페트병은 사용하지 말아주세요'
                    }
                }
            },
            userPoint : 10,
            slider: 45
        }
    },
    methods : {
        pointProgress: function() {
            this.userPoint += 10   
        }
    }
    

}
</script>