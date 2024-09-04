<template>
  <div>
    <div v-if="users.length > 0">
      <div v-for="u in users" :key="u.id">
        <UserItem :user="u" :id="u.id" />
      </div>
    </div>
    <v-card v-else variant="outlined">
      <v-card-title>No users available</v-card-title>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
