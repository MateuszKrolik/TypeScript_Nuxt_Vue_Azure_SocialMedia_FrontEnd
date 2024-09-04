<template>
  <div>
    <div v-if="users.length > 0">
      <div v-for="u in users" :key="u.id">
        <UserItem :user="u" :id="u.id" />
      </div>
    </div>
    <v-alert type="info" v-else>
      <p>No users available</p>
    </v-alert>
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
