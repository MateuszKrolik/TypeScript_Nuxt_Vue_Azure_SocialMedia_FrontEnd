<template>
  <div class="center">
    <ForgotPasswordForm :onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup>
import { WebApplication1Api } from '~/api-client';

const apiClient = new WebApplication1Api();

const handleFormSubmit = async (formData) => {
  try {
    await apiClient.forgotPasswordPost({
      forgotPasswordRequest: { email: formData.email },
    });
    navigateTo('/resetPassword');
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    alert('Failed to send password reset email.');
  }
};

definePageMeta({
  middleware: ['disable-auth-page'],
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
