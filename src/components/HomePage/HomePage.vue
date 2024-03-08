<template>
  <div class="home-page" @keydown="handleKeyDown" tabindex="0">
    <v-toolbar class="home-page__toolbar">
      <img src="@/assets/logo.png" alt="Logo" class="home-page__toolbar-logo" />

      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <v-text-field
          v-if="isSearchVisible"
          v-model="searchQuery"
          id="110"
          ref="110"
          :tabindex="activeItemId === 110 ? 0 : -1"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-slide-x-reverse-transition>

      <v-btn
        icon
        @click="toggleSearch"
        :outlined="activeItemId === 120"
        ref="120"
        id="120"
        :tabindex="activeItemId === 120 ? 0 : -1"
      >
        <v-icon class="home-page__search-icon">mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <TrendingList
      :list-items="filteredTrendingMovies"
      :title="trendingMoviesTitle"
      :active-item-id="activeItemId"
      :is-key-entered="isKeyEntered"
      @show-details="openDetailsDialog"
    />
    <TrendingList
      :list-items="filteredTrendingTVShows"
      :title="trendingTVShowsTitle"
      :active-item-id="activeItemId"
      :is-key-entered="isKeyEntered"
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
const TrendingList = () => import("@/components/TrendingList/TrendingList.vue");
const TrendingItemDetails = () =>
  import("@/components/TrendingItemDetails/TrendingItemDetails.vue");

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
      activeItemId: null,
      isKeyEntered: false,
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

    filteredTrendingMoviesById() {
      return this.filteredTrendingMovies.map((movie) => {
        return {
          id: movie.id,
        };
      });
    },

    filteredTrendingTVShowsById() {
      return this.filteredTrendingTVShows.map((tv) => {
        return {
          id: tv.id,
        };
      });
    },

    listForNavigation() {
      return [{ id: 110 }, { id: 120 }]
        .concat(
          this.filteredTrendingMoviesById.concat(
            this.filteredTrendingTVShowsById
          )
        )
        .flat();
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
    handleKeyDown(event: KeyboardEvent) {
      const currentIndex = this.listForNavigation.findIndex(
        (item) => item.id === this.activeItemId
      );

      if (event.key === "Enter") {
        if (this.activeItemId === 120 || this.activeItemId === 110) {
          this.$refs[this.activeItemId].$el.click();
        } else {
          this.isKeyEntered = true;
        }
      } else if (event.key === "ArrowRight") {
        this.activeItemId =
          currentIndex < this.listForNavigation.length - 1
            ? this.listForNavigation[currentIndex + 1].id
            : this.listForNavigation[0].id;
        this.isKeyEntered = false;
      } else if (event.key === "ArrowLeft") {
        this.activeItemId =
          currentIndex > 0
            ? this.listForNavigation[currentIndex - 1].id
            : this.listForNavigation[this.listForNavigation.length - 1].id;
        this.isKeyEntered = false;
      }
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

    @media (min-width: 1500px) {
      .v-text-field .v-label {
        font-size: 24px;
      }
    }
  }

  .home-page__toolbar-logo {
    max-height: 100%;
    width: auto;

    @media (min-width: 1500px) {
      height: auto;
      max-height: fit-content;
      width: 300px;
    }
  }

  .home-page__search-icon {
    @media (min-width: 1500px) {
      font-size: 50px;
    }
  }
}
</style>
