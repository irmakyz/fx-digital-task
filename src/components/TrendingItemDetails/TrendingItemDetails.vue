<template>
  <v-dialog
    v-model="dialog"
    scrollable
    @click:outside="closeDialog"
    content-class="item-details"
    :max-width="responsiveWidth"
  >
    <v-card class="mx-auto item-details__content">
      <v-img :src="imageUrl"></v-img>

      <v-card-title class="item-details__title">
        {{ itemDetails.title }}
      </v-card-title>

      <v-card-subtitle class="item-details__subtitle">
        Released on {{ itemDetails.releaseDate }}</v-card-subtitle
      >
      <v-card-subtitle class="item-details__subtitle">
        Vote Average: {{ itemDetails.voteAvg }}</v-card-subtitle
      >
      <v-spacer></v-spacer>
      <v-card-subtitle class="item-details__subtitle">
        {{ itemDetails.overview }}</v-card-subtitle
      >
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Item, ItemDetails } from "@/interfaces";

export default {
  name: "TrendingItemDetails",
  props: {
    item: {
      type: Object as () => Item,
    },
    imageUrl: {
      type: String,
    },
    isDialogOpen: {
      type: Boolean,
    },
  },
  data() {
    return { dialog: false };
  },
  watch: {
    isDialogOpen(newVal: boolean) {
      this.dialog = newVal;
    },
  },
  computed: {
    itemDetails(): ItemDetails {
      return {
        title: this.item.title || this.item.name,
        imgUrl: this.imageUrl,
        overview: this.item.overview,
        releaseDate: this.item.release_date || this.item.first_air_date,
        voteAvg: this.item.vote_average,
      };
    },

    responsiveWidth(): number {
      if (
        !this.$vuetify ||
        !this.$vuetify.breakpoint ||
        !this.$vuetify.breakpoint.name
      )
        return 500;

      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 300;
        case "sm":
          return 500;
        case "md":
          return 500;
        case "lg":
          return 700;
        case "xl":
          return 1000;
        default:
          return 500;
      }
    },
  },
  methods: {
    // eslint-disable-next-line
    closeDialog(this: any): void {
      this.$emit("close-details");
    },
  },
};
</script>
<style lang="scss" scoped>
.item-details {
  .item-details__content {
    overflow: auto;
  }

  @media (min-width: 1500px) {
    .item-details__subtitle {
      font-size: 20px;
    }
    .item-details__title {
      font-size: 25px;
      padding-bottom: 30px;
    }
  }
}
</style>
