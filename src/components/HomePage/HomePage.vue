<template>
  <div class="home-page">
    <v-toolbar class="home-page__toolbar">
      <img src="@/assets/logo.png" alt="Logo" class="home-page__toolbar-logo" />

      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <v-text-field
          v-if="isSearchVisible"
          v-model="searchQuery"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-slide-x-reverse-transition>

      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <TrendingList
      :list-items="filteredTrendingMovies"
      :title="trendingMoviesTitle"
      @show-details="openDetailsDialog"
    />
    <TrendingList
      :list-items="filteredTrendingTVShows"
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
      searchQuery: "",
      isSearchVisible: false,
    };
  },
  async beforeMount() {
    await this.fetchTrendingMovies();
    await this.fetchTrendingTVShows();
  },

  computed: {
    ...mapState(["trendingMovies", "trendingTVShows"]),

    filteredTrendingMovies() {
      if (!this.searchQuery) return this.trendingMovies;
      return this.trendingMovies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    filteredTrendingTVShows() {
      if (!this.searchQuery) return this.trendingTVShows;
      return this.trendingTVShows.filter((show) =>
        (show.title || show.name)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
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
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
    },
  },
});
</script>

<style scoped lang="scss">
.home-page {
  padding: 30px;
  .home-page__toolbar {
    box-shadow: 0 4px 6px -6px black;
    background: transparent;
    margin-bottom: 30px;
  }
  .home-page__toolbar-logo {
    max-height: 100%;
    width: auto;
  }
}
</style>
