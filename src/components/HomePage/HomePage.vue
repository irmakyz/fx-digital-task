<template>
  <div class="home-page">
    <TrendingList
      :list-items="trendingMovies"
      :title="trendingMoviesTitle"
      @show-details="openDetailsDialog"
    />
    <TrendingList
      :list-items="trendingTVShows"
      :title="trendingTVShowsTitle"
      @show-details="openDetailsDialog"
    />
    <TrendingItemDetails
      :item="item"
      :image-url="imageUrl"
      ref="detailsDialog"
      @close-details="closeDetailsDialog"
      :is-dialog-open="isDialogOpen"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import TrendingList from "../TrendingList/TrendingList.vue";
import TrendingItemDetails from "../TrendingItemDetails/TrendingItemDetails.vue";

import { ACTIONS } from "../../store/constants";
export default Vue.extend({
  name: "HomePage",
  components: {
    TrendingList,
    TrendingItemDetails,
  },
  data: function () {
    return {
      trendingMoviesTitle: "Trending Movies",
      trendingTVShowsTitle: "Trending TV Shows",
      item: {},
      imageUrl: "",
      isDialogOpen: false,
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

    openDetailsDialog(itemProperties: { item: object; imageUrl: string }) {
      if (this.$refs.detailsDialog) {
        this.item = itemProperties.item;
        this.imageUrl = itemProperties.imageUrl;
        this.isDialogOpen = true;
      }
    },
    closeDetailsDialog() {
      this.isDialogOpen = false;
    },
  },
});
</script>

<style scoped lang="scss">
.home-page {
  padding: 30px;
}
</style>
