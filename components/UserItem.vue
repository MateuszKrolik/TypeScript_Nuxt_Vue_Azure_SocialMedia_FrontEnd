<template>
  <div>
    <v-card link :to="`${user.id}/places`">
      <v-card-title>{{ user.email }}</v-card-title>
      <v-card-subtitle v-if="user.places.length === 1"
        >{{ user.places.length }} Place</v-card-subtitle
      >
      <v-card-subtitle v-else>{{ user.places.length }} Places</v-card-subtitle>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
