<template>
    <container>
        <center>
            <img 
                :src="user.photoURL"
                width="150"
                height="150"
                id="user_image_round"
                style="margin-top: 10px"
            />
            <p class="text-align-center" style="margin: auto;font-size: 30px">{{user.displayName}}</p>
        </center>
    </container>

</template>

<script>
export default {
    name: 'MyPage',
    data () {
        return {
            user : {
                displayName: 'username',
                points: 10,
                level: 'bronze',
                photoURL: 'https://picsum.photos/id/11/300/300',
                complaints : {
                    1 : {
                        writer : 'username',
                        content : '환경을 위해 유색 페트병은 사용하지 말아주세요'
                    }
                }
            }
        }
    }
    
}
</script>
<style>
    #user_image_round {
        border-radius: 50%;
    }
</style>