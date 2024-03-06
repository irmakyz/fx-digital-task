<!-- frontend/src/components/App/components/Home/components/TrendingList/TrendingList.vue -->

<template>
  <div class="trending-list">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="movie in movieList" :key="movie.id">
        <v-card class="trending-list-item">
          <v-img
            :src="`${baseUrl}w500${movie.poster_path}`"
            class="white--text align-end item-image"
          >
            <v-card-title>{{ movie.title }}</v-card-title>
          </v-img>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const BASE_URL = "https://image.tmdb.org/t/p/";

export default Vue.extend({
  name: "TrendingList",
  props: {
    title: {
      type: String,
      required: true,
    },
    movieList: {
      type: Array as () => Movie[],
      required: true,
    },
  },
  data() {
    return {
      baseUrl: BASE_URL,
    };
  },
});

// Define interfaces for Movie and TVShow
interface Movie {
  id: number;
  title: string;
  src: string;
}
</script>

<style scoped lang="scss">
.trending-list {
  ul {
    display: flex;
    gap: 20px;
    list-style-type: none;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .trending-list-item {
    display: flex;
    width: 250px;
    .item-image {
      object-fit: cover;
    }
  }
}
</style>
