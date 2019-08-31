<template>
    <div>
        <template>
                <v-tabs vertical>
                <v-tab>
                    내 정보 보기
                </v-tab>
                <v-tab>
                    내 청원 내역
                </v-tab>
                <v-tab-item>
                    <UserInfo/>
                    <UserExp/>
                </v-tab-item>
                <v-tab-item>
                    <ComplaintList/>
                </v-tab-item>
                </v-tabs>
        </template>     
    </div>
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