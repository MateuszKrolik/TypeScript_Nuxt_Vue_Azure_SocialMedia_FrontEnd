<template>
  <div class="center">
    <PlaceForm :onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup>
import { PlacesApi, Configuration } from '~/api-client';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleFormSubmit = async (formData) => {
  const configuration = new Configuration({
    apiKey: authStore.token,
  });
  const placesApi = new PlacesApi(configuration);

  try {
    console.log('Submitting form with data:', formData);

    const response = await placesApi.apiPlacesPost({
      title: formData.title,
      address: formData.address,
      description: formData.description,
      image: formData.image ? formData.image : null,
    });
    alert('Form submitted successfully');
    const creatorId = response.creator;
    router.push(`/${creatorId}/places`);
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit form');
  }
};

definePageMeta({
  middleware: ['auth'],
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
