<template>
  <iframe
    width="100%"
    height="450"
    style="border: 0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    :src="mapUrl"
  ></iframe>
</template>

<script setup>
const props = defineProps({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});
const MAPS_BASE_URL = 'https://www.google.com/maps/embed/v1/place';
const config = useRuntimeConfig();
const mapUrl = computed(() => {
  return `${MAPS_BASE_URL}?key=${config.public.googleMapsApiKey}&q=${props.lat},${props.lng}`;
});
</script>

<style scoped></style>
