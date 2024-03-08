<template>
  <v-app>
    <v-main>
      <HomePage />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
const HomePage = () => import("@/components/HomePage/HomePage.vue");

export default Vue.extend({
  name: "App",

  components: {
    HomePage,
  },

  data: () => ({}),
});
</script>
