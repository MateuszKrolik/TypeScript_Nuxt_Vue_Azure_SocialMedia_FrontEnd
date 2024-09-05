<template>
  <div>
    <div v-if="places.length > 0">
      <div v-for="p in places" :key="p.id">
        <PlaceItem :place="p" :id="p.id" />
      </div>
    </div>
    <v-card v-else variant="outlined">
      <v-card-title>No places available</v-card-title>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  places: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
