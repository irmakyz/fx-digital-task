<!-- frontend/src/components/App/components/Home/components/TrendingList/TrendingList.vue -->

<template>
  <div class="trending-list">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="item in listItems" :key="item.id">
        <v-card class="trending-list-item" @click="showDetails(item)">
          <v-img
            :src="`${baseUrl}w500${item.poster_path}`"
            class="white--text align-end item-image"
          >
            <v-card-title>{{ item.title || item.name }}</v-card-title>
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
    listItems: {
      type: Array as () => Item[],
      required: true,
    },
  },
  mounted() {
    console.log("movielist,", this.listItems);
  },

  data() {
    return {
      baseUrl: BASE_URL,
    };
  },

  methods: {
    showDetails(item: Item) {
      this.$emit("show-details", {
        item,
        imageUrl: `${this.baseUrl}w500${item.backdrop_path}`,
      });
    },
  },
});

interface Item {
  id: number;
  title?: string;
  name?: string;
  src: string;
  backdrop_path: {
    type: string;
    required: true;
  };
  poster_path: {
    type: string;
    required: true;
  };
  overview: {
    type: string;
    required: true;
  };
  release_date?: {
    type: string;
    required: true;
  };
  first_air_date?: {
    type: string;
    required: true;
  };
  vote_average: {
    type: number;
    required: true;
  };
}
</script>

<style scoped lang="scss">
.trending-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
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
