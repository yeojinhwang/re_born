<template >
    <v-tabs vertical  style="background-color : #DDEAD3;">
        <v-tab>
            내 정보 보기
        </v-tab>
        <v-tab>
            내 청원 내역
        </v-tab>
        <v-tab-item class="mt-3">
            <UserInfo/>
            <UserExp/>
        </v-tab-item>
        <v-tab-item>
            <ComplaintList/>
        </v-tab-item>
    </v-tabs>
</template>     

<script>
import UserInfo from './components/UserInfo'
import UserExp from './components/UserExp'
import ComplaintList from './components/ComplaintList'

export default {
    name: 'MyPage',
    components: {
        UserInfo,
        UserExp,
        ComplaintList
    }
}
</script>