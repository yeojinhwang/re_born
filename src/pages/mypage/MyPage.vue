<template>
    <container>
        <UserInfo/>
        <UserExp/>
    </container>
</template>
<script>
import UserInfo from './components/UserInfo.vue'
import UserExp from './components/UserExp.vue'

export default {
    name: 'MyPage',
    components: {
        UserInfo,
        UserExp
    }
}
</script>