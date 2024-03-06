<template>
  <div>
    <TrendingList :movie-list="trendingMovies" :title="trendingMoviesTitle" />
    <TrendingList :movie-list="trendingTVShows" :title="trendingTVShowsTitle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import TrendingList from "../TrendingList/TrendingList.vue";
import { ACTIONS } from "../../store/constants";
export default Vue.extend({
  name: "HomePage",
  components: {
    TrendingList,
  },
  data: function () {
    return {
      trendingMoviesTitle: "Trending Movies",
      trendingTVShowsTitle: "Trending TV Shows",
    };
  },
  async beforeMount() {
    await this.fetchTrendingMovies();
    await this.fetchTrendingTVShows();
  },
  watch: {
    trendingMovies() {
      console.log(this.trendingMovies);
    },
  },
  computed: {
    ...mapState(["trendingMovies", "trendingTVShows"]),
  },
  methods: {
    async fetchTrendingMovies() {
      await this.$store.dispatch(ACTIONS.FETCH_TRENDING_MOVIES);
    },

    async fetchTrendingTVShows() {
      await this.$store.dispatch(ACTIONS.FETCH_TRENDING_TV_SHOWS);
    },
  },
});
</script>

<style scoped>
/* Your component styles go here */
</style>
