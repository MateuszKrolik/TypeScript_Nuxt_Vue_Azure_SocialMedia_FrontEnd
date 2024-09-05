<template>
  <div>
    <v-card variant="outlined">
      <v-img
        :width="300"
        aspect-ratio="16/9"
        cover
        :src="place.imageUrl"
        :alt="place.title"
      ></v-img>
      <v-card-title>{{ place.title }}</v-card-title>
      <v-card-subtitle>{{ place.address }}</v-card-subtitle>
      <v-card-text>{{ place.description }}</v-card-text>
      <Dialog :title="place.address" buttonText="View on map">
        <MapIframe
          :lat="place.placeLocation.lat"
          :lng="place.placeLocation.lng"
        />
      </Dialog>
      <v-btn>EDIT</v-btn>
      <v-btn>DELETE</v-btn>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
});
console.log('Place props:', props.place);
</script>

<style lang="scss" scoped></style>
