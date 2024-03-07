<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="300px"
    @click:outside="closeDialog"
  >
    <v-card class="mx-auto" max-width="344">
      <v-img :src="imageUrl" height="200px"></v-img>

      <v-card-title> {{ itemDetails.title }} </v-card-title>

      <v-card-subtitle>
        Released on {{ itemDetails.releaseDate }}</v-card-subtitle
      >
      <v-card-subtitle>
        Vote Average: {{ itemDetails.voteAvg }}</v-card-subtitle
      >
      <v-spacer></v-spacer>
      <v-card-subtitle> {{ itemDetails.overview }}</v-card-subtitle>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TrendingItemDetails",
  props: {
    item: Object,
    imageUrl: String,
    isDialogOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    isDialogOpen() {
      this.dialog = this.isDialogOpen;
    },
  },
  computed: {
    itemDetails() {
      return {
        title: this.item.title || this.item.name,
        imgUrl: this.imgUrl,
        overview: this.item.overview,
        releaseDate: this.item.release_date || this.item.first_air_date,
        voteAvg: this.item.vote_average,
      };
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-details");
    },
  },
};
</script>

<style scoped>
/* Your modal styling here */
</style>
