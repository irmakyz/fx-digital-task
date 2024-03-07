<!-- frontend/src/components/App/components/Home/components/TrendingList/TrendingList.vue -->

<template>
  <div class="trending-list">
    <h2 class="trending-list__title">{{ title }}</h2>
    <ul class="trending-list__items">
      <li v-for="item in listItems" :key="item.id" @click="showDetails(item)">
        <v-card
          @click="showDetails(item)"
          :class="{
            'trending-list-item': true,
            'trending-list-item--selected': item.id === activeItemId,
          }"
          :tabindex="item.id === activeItemId ? 0 : -1"
          :ref="item.id"
        >
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
import { Item } from "../../interfaces/index";

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
    activeItemId: {
      type: Number,
    },
    isKeyEntered: {
      type: Boolean,
    },
  },

  data() {
    return {
      baseUrl: BASE_URL,
    };
  },
  computed: {
    focusedItem() {
      return this.listItems.find((item) => item.id === this.activeItemId);
    },
  },
  watch: {
    activeItemId(newVal: number | null) {
      if (newVal && this.focusedItem) {
        this.$refs[this.activeItemId][0].$el.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    isKeyEntered(newVal: boolean, oldVal: boolean) {
      if (newVal && newVal !== oldVal) {
        if (this.$refs[this.activeItemId])
          this.$refs[this.activeItemId][0].$el.click();
      }
    },
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
</script>

<style scoped lang="scss">
.trending-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  padding-inline: 38px;

  .trending-list__items {
    display: flex;
    gap: 20px;
    list-style-type: none;
    overflow-y: hidden;
    overflow-x: auto;
    padding-left: 0;
  }
  .trending-list-item {
    display: flex;
    width: 250px;

    .item-image {
      object-fit: cover;
    }
  }
  .trending-list-item--selected {
    box-shadow: 0px -25px 11px 0px #82b1ff, 25px 0px 20px -20px #82b1ff,
      0px 25px 20px 1px #82b1ff, -25px 0px 20px -20px #82b1ff;
  }
}
</style>
