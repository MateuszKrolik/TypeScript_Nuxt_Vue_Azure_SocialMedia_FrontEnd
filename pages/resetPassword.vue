<template>
  <div class="center">
    <ResetPasswordForm :onSubmit="handleFormSubmit" />
  </div>
</template>

<script setup>
import { WebApplication1Api } from '~/api-client';

const apiClient = new WebApplication1Api();

const handleFormSubmit = async (formData) => {
  try {
    await apiClient.resetPasswordPost({
      resetPasswordRequest: {
        email: formData.email,
        newPassword: formData.newPassword,
        resetCode: formData.resetCode,
      },
    });
    navigateTo('/authenticate');
  } catch (error) {
    console.error('Failed to reset password:', error);
    alert('Failed to reset password');
  }
};

definePageMeta({
  middleware: ['disable-auth-page'],
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/index.scss');
</style>
