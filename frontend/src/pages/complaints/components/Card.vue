<template>
  <v-layout mt-5 wrap style="justify-content:center;">
    <!-- v-bind="{ [`xs${card.flex}`]: true }" -->
    <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4 lg3>
      <v-card>
        <v-img
          :src="card.src"
          class="white--text"
          height="200px"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-card-text class="text-center" v-text="card.title"></v-card-text>
        </v-img>

        <v-card-actions style="justify-content:center;">
          <div class="flex-grow-1"></div>
          <router-link to="/report" style="text-decoration:none;">
            <v-btn icon>
              <v-icon>mdi-bell-alert</v-icon>
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6
      }
    ]
  })
};
</script>

<style>
.flex {
  margin: 0px 0px 10px 0px;
}
</style>