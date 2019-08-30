<template>
  <v-container>
    <v-layout>
        <p>Re-born</p>
    </v-layout>
    <v-layout>
      <!-- login provider -->
        <div id="loginProvider">
          <v-btn 
            class="loginBtn"
            depressed small style="color: #0F9D58;"
            @click="googleLogin">
            <v-icon right dark style="
              margin-left: 0px;
              margin-right: 7px;
              ">fab fa-google</v-icon>
            Google 로그인
          </v-btn>
        </div>
      </v-layout>
      <v-divider></v-divider>
      <!-- email with password -->
      <v-layout>
      <v-form
        ref="form"
        v-model="form"
        v-show="viewSign"
        >
        <!-- email -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          filled
          label="Email address"
          type="email"
          style="width:240px; margin: auto;"
        ></v-text-field>
        <!-- displayName -->
        <!-- 회원가입 폼에서만 보임 -->
        <v-text-field
          v-model="displayName"
          :rules="nameRules"
          filled
          label="name"
          name="nameForm"
          style="width:240px; margin: auto;"
          v-on:keyup="characterCheck()"
          v-on:keydown="characterCheck()"
        ></v-text-field>
        <!-- password -->
        <v-text-field
          v-model="password"
          :append-icon="pwShow ? 'visibility' : 'visibility_off'"
          :rules="pwRules"
          filled
          label="Password"
          :type="pwShow ? 'text' : 'password'"
          @click:append="pwShow = !pwShow"
          style="width:240px; margin: auto;"
        ></v-text-field>

        <v-btn
          class="loginBtn"
          :loading="loading"
          :disabled="!form"
          color="success"
          @click="loader()"
        >
          가입하기
        </v-btn>
      </v-form>
      
      <v-form
        ref="form"
        v-model="form"
        v-show="!viewSign"
        >
        <!-- email -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          filled
          label="Email address"
          type="email"
          style="width:240px; margin: auto;"
        ></v-text-field>
        <!-- password -->
        <v-text-field
          v-model="password"
          :append-icon="pwShow ? 'visibility' : 'visibility_off'"
          :rules="pwRules"
          filled
          label="Password"
          :type="pwShow ? 'text' : 'password'"
          @click:append="pwShow = !pwShow"
          style="width:240px; margin: auto;"
        ></v-text-field>

        <v-btn
          class="loginBtn"
          :loading="loading"
          :disabled="!form"
          color="success"
          @click="loader()"
        >
          로그인
        </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import firebase from 'firebase'
import router from '../../router'
import store from '../../store'

export default {
  name: 'Sign',
  data () {
    return {
      viewSign: false,
      // login modal
      agreement: false,
      dialog: false,
      // form
      form: false,
      // input rules
      email: '',
      emailRules: [
        v => !!(v || '').match(/@/) || '@를 포함한 email을 입력해주세요.',
      ],
      displayName: '',
      nameRules: [
        v => !!v || '이름을 입력해주세요.',
      ],
      // pw rule
      pwShow: false,
      password: '',
      pwRules: [
        v => !!v || '비밀번호를 입력해주세요.',
        v => v.length >= 8 || '최소 8자 이상 입력해주세요.',
      ],
      // service rule
      agreeRules: [
        v => !!v || '동의가 필요합니다.',
      ],
      // loading button
      loading: false,
    }
  },
  methods: {
    loader() {
      // btn 클릭에 맞는 func
      if(this.viewSign == true) {
        this.createUserWithEmail()
      } else {
        this.emailLogin()
      }
      // 로딩활성화
      this.loading = true
    },
    async createUserWithEmail() {
      let _this = this
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(function(user) {
          FirebaseServices.createdbForNewUser(user.user.uid, _this.$store.state.today, _this.displayName)
          // 유저 생성하면서 입력받은 이름 설정
          let _user = firebase.auth().currentUser
          _user.updateProfile({
              displayName: _this.displayName,
              photoURL: 'http://dy.gnch.or.kr/img/no-image.jpg'
          })
        //   setTimeout(function () {
        //     router.push('/')
        //   }, 2000)
        })
        .catch(function(err) {
            if (err.code == 'auth/email-already-in-use') {
              alert('이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.')
              _this.email = ''
            }
            _this.loading = false
            _this.agreement = false
        })
    },
    async emailLogin() {
      let _this = this
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(function(result) {
          store.commit('setPhotoURL', result.user.photoURL)
          setTimeout(function () {
            router.push('/')
          }, 2000)
        })
        .catch(function(err) {
          if (err.code == 'auth/user-not-found') {
            alert('존재하지 않는 유저 입니다.')
            _this.email = ''
            _this.password = ''
          }
          else if (err.code == 'auth/wrong-password') {
            alert ('비밀번호가 틀렸습니다. 다시 입력해주세요.')
            _this.password = ''
          }
          _this.loading = false
        })
    },
    async googleLogin() {
      await FirebaseServices.loginUserWithGoogle()
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          router.push('/')
        }
      })
    },
    // 유저네임 특수문자 제한
    characterCheck() {
      let RegExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/
      let obj = document.getElementsByName("nameForm")[0]
      if (RegExp.test(obj.value)) {
        // 현재 데이터와 연결해서 특수문자 입력을 받으면 마지막 문자를 제거
        this.displayName = obj.value.substring(0, obj.value.length - 1)
        alert('특수문자는 입력하실 수 없습니다.')
      }
    }
  }
}
</script>
