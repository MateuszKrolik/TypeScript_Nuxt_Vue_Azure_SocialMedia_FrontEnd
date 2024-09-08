<template>
  <div class="center">
    <PlaceForm
      v-if="isAuthorized"
      :onSubmit="handleFormSubmit"
      :initialValues="initialValues"
    />
  </div>
</template>

<script setup>
import { PlacesApi, Configuration } from '~/api-client';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const route = useRoute();
const placeId = route.params.placeId;

const initialValues = ref({
  title: '',
  address: '',
  description: '',
  image: null,
});

const isAuthorized = ref(false);

const fetchPlaceData = async () => {
  const configuration = new Configuration({
    apiKey: authStore.token,
  });
  const placesApi = new PlacesApi(configuration);

  try {
    const place = await placesApi.apiPlacesIdGet({ id: placeId });
    isAuthorized.value = place.creator === authStore.userId;

    if (!isAuthorized.value) {
      alert("You can't update other people's places!");
      navigateTo('/');
      return;
    }

    initialValues.value = {
      title: place.title,
      address: place.address,
      description: place.description,
      image: place.image,
    };
  } catch (error) {
    console.error('Error fetching place data:', error);
    alert('Failed to fetch place data.');
    navigateTo('/');
  }
};

onMounted(() => {
  fetchPlaceData();
});

const handleFormSubmit = async (formData) => {
  const configuration = new Configuration({
    apiKey: authStore.token,
  });
  const placesApi = new PlacesApi(configuration);

  const response = await placesApi.apiPlacesIdPatch({
    id: placeId,
    title: formData.title,
    address: formData.address,
    description: formData.description,
    image: formData.image ? formData.image : null,
  });

  alert('Place updated successfully');
  const creatorId = response.creator;
  navigateTo(`/${creatorId}/places`);
};
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
