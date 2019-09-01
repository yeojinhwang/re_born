<template>
  <div class="Report">
    <Search></Search>
    <v-layout wrap style="justify-content:center;">
      <v-flex xs12>
        <v-card>
          <div class="background">
            <v-card-title>접수 건수</v-card-title>
            <v-card-title>00건</v-card-title>
          </div>
          <div class="content">
            <h3>{{company_name}}</h3>
            <textarea id="txa" cols="30" rows="10">청원 내용을 입력해주세요.</textarea>
          </div>
          <v-card-actions>
            <v-btn outlined color="indigo">취소하기</v-btn>
            <v-btn outlined @click="repo()">청원하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Search from "./components/Search";
import { EventBus } from "../../utils/event-bus";

import FirebaseServices from "../../services/FirebaseServices";
import firebase from "firebase";

export default {
  components: {
    Search
  },
  data() {
    return {
      company_name: "",
      complaints_num: 0,
      count: 0,
      complaints: []
    };
  },
  methods: {
    async init() {
      const response = await FirebaseServices.getCompaintList();
      this.complaints = response;
      console.log(complaints);
    }
  },
  mounted() {
    EventBus.$once("use-eventbus", companyname => {
      this.company_name = companyname;
      this.init();
    });
  }
};
</script>

<style>
.v-card__title {
  justify-content: center;
  color: white;
  height: 100px;
}
.v-card__actions {
  justify-content: flex-end;
}
.background {
  background: #87cefa;
}
.content {
  width: 85%;
  margin: 20px;
}
.v-btn {
  margin: 0px 15px;
}
.layout {
  margin: 20px;
}
textarea {
  width: 100%;
  padding: 5px;
}
</style>