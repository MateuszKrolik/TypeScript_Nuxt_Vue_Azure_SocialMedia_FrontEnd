<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model.trim="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>

      <v-btn class="me-4" type="submit">Send Email</v-btn>
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
  },
});

const email = useField('email');

const submit = handleSubmit((values) => {
  props.onSubmit(values);
});
</script>

<style lang="scss" scoped></style>
