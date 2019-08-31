<template>
  <v-layout mt-5 wrap style="justify-content:center;">
    <v-flex xs12>
      <v-card>
        <div class="background">
          <v-card-title>접수 건수</v-card-title>
          <v-card-title>00건</v-card-title>
        </div>
        <div class="content">
          <v-textarea outlined label="청원 내용" value="청원 내용을 입력해주세요.">I'm card text</v-textarea>
        </div>
        <v-card-actions>
          <v-btn outlined color="indigo">취소하기</v-btn>
          <v-btn outlined>청원하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
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
  margin: 20px 20px 0px 20px;
}
.v-btn {
  margin: 0px 15px;
}
.layout {
  margin: 20px;
}
</style>