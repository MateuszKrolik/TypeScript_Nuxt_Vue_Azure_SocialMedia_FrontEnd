<template>
  <div class="center">
    <UsersList :users="users" />
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
import { UsersApi } from '~/api-client';
const users = ref([]);
const isLoading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const usersApi = new UsersApi();

const fetchUsers = async (pageNumber = 1, pageSize = 1) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await usersApi.apiUsersGet({ pageNumber, pageSize });
    users.value = response.users;
    currentPage.value = response.currentPage;
    totalPages.value = response.totalPages;
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};

watch(currentPage, (newPage) => {
  fetchUsers(newPage);
});

onMounted(() => {
  fetchUsers();
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
