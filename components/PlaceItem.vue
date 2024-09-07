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
      <v-btn @click="navigateToEditPage">EDIT</v-btn>
      <v-btn @click="deletePlace">DELETE</v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { PlacesApi, Configuration } from '~/api-client';
import { useAuthStore } from '~/store/auth'; 
const authStore = useAuthStore(); 

const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const navigateToEditPage = () => {
  router.push(`/places/${props.place.id}`);
};

const deletePlace = async () => {
  const configuration = new Configuration({
    apiKey: authStore.token,
  });
  const placesApi = new PlacesApi(configuration);
  try {
    await placesApi.apiPlacesIdDelete({ id: props.place.id });
    alert('Place deleted successfully');
    router.push(`/${props.place.creator}/places`);
  } catch (error) {
    console.error('Error deleting place:', error);
    alert('Failed to delete place, are you its owner?');
  }
};
</script>

<style lang="scss" scoped></style>
