<template>
  <div class="center">
    <h2>PlaceId: {{ placeId }}</h2>
    <PlaceForm :onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup>
import { PlacesApi } from '~/api-client';

const { placeId } = useRoute().params;
const router = useRouter();

const handleFormSubmit = async (formData) => {
  const placesApi = new PlacesApi();

  try {
    console.log('Submitting form with data:', formData);

    const response = await placesApi.apiPlacesIdPatch({
      id: placeId,
      title: formData.title,
      address: formData.address,
      description: formData.description,
      image: formData.image ? formData.image : null,
    });
    alert('Place updated successfully');
    const creatorId = response.creator;
    router.push(`/${creatorId}/places`);
  } catch (error) {
    console.error('Error updating place:', error);
    alert('Failed to update place');
  }
};
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
