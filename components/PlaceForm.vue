<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="title.value.value"
        :counter="10"
        :error-messages="title.errorMessage.value"
        label="Title"
      ></v-text-field>

      <v-text-field
        v-model="address.value.value"
        :counter="20"
        :error-messages="address.errorMessage.value"
        label="Address"
      ></v-text-field>

      <v-file-input
        v-model="image"
        :rules="imageRules"
        accept="image/png, image/jpeg, image/jpg"
        label="Image"
        placeholder="Pick an image"
        prepend-icon="mdi-camera"
      ></v-file-input>

      <v-textarea
        v-model="description.value.value"
        :counter="50"
        :error-messages="description.errorMessage.value"
        label="Description"
      ></v-textarea>

      <v-btn class="me-4" type="submit">Submit</v-btn>
      <v-btn @click="handleReset">Clear</v-btn>
    </form>
  </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
  initialValues: {
    type: Object,
    default: () => ({}),
  },
});

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: {
    title(value) {
      if (value?.length >= 2) return true;
      return 'Title needs to be at least 2 characters.';
    },
    address(value) {
      if (value?.length >= 2) return true;
      return 'Address needs to be at least 2 characters.';
    },
    description(value) {
      if (value?.length >= 4) return true;
      return 'Description needs to be at least 4 characters.';
    },
  },
});

const title = useField('title');
const address = useField('address');
const description = useField('description');
const image = ref(null);

const imageRules = ref([
  (value) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 1000000 ||
      'Image size should be less than 1 MB!'
    );
  },
]);

watch(
  () => props.initialValues,
  (newValues) => {
    setValues(newValues);
  },
  { immediate: true }
);

const submit = handleSubmit((values) => {
  props.onSubmit({ ...values, image: image.value });
});
</script>

<style lang="scss" scoped></style>
