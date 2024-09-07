<template>
  <div class="center">
    <PlaceList :places="places" />
    <v-progress-circular v-if="isLoading" indeterminate />
    <v-alert v-if="error" type="error" :text="error.message" class="error" />
    <v-pagination
      v-if="!isLoading && !error"
      v-model="currentPage"
      :length="totalPages"
      :total-visible="3"
    />
  </div>
</template>

<script setup>
import { PlacesApi, Configuration } from '~/api-client';
import { useAuthStore } from '~/store/auth'; 
const authStore = useAuthStore(); 

const places = ref([]);
const isLoading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);

const configuration = new Configuration({
  apiKey: authStore.token,
});
const placesApi = new PlacesApi(configuration);

const route = useRoute();
const userId = route.params.userId;

const fetchPlaces = async (pageNumber = 1, pageSize = 1) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await placesApi.apiPlacesUserUserIdGet({
      userId,
      pageNumber,
      pageSize,
    });
    places.value = response.places;
    currentPage.value = response.currentPage;
    totalPages.value = response.totalPages;
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};

watch(currentPage, (newPage) => {
  fetchPlaces(newPage);
});

onMounted(() => {
  fetchPlaces();
});

definePageMeta({
  middleware: ['auth'],
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
