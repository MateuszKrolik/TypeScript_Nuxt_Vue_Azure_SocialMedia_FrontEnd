<template>
  <div class="center">
    <h1>Authenticate</h1>
    <LoginForm />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['disable-auth-page'],
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
