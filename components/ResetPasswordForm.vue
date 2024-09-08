<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model.trim="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model.trim="newPassword.value.value"
        :error-messages="newPassword.errorMessage.value"
        label="New Password"
        type="password"
      ></v-text-field>

      <v-textarea
        v-model.trim="resetCode.value.value"
        :counter="50"
        :error-messages="resetCode.errorMessage.value"
        label="Reset Code"
      ></v-textarea>

      <v-btn class="me-4" type="submit">Reset Password</v-btn>
      <v-btn @click="handleReset">Clear</v-btn>
    </form>
  </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email(value) {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) return true;

      return 'Must be a valid e-mail.';
    },
    newPassword(value) {
      if (value?.length >= 6) return true;
      return 'New password needs to be at least 6 characters.';
    },
    resetCode(value) {
      if (value?.length >= 4) return true;
      return 'Reset Code needs to be at least 4 characters.';
    },
  },
});

const email = useField('email');
const newPassword = useField('newPassword');
const resetCode = useField('resetCode');

const submit = handleSubmit((values) => {
  props.onSubmit(values);
});
</script>

<style lang="scss" scoped></style>
