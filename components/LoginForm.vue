<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <v-text-field label="E-mail" type="email" v-model.trim="email" required />

      <v-text-field
        label="Password"
        type="password"
        v-model.trim="password"
        required
      />

      <v-alert v-if="!formIsValid" type="warning"
        >Please enter a valid email and password (must be at least 6 characters
        long).</v-alert
      >

      <v-row>
        <v-col>
          <v-btn type="submit">{{ submitButtonCaption }}</v-btn>
        </v-col>

        <v-col>
          <v-btn type="button" mode="flat" @click="switchAuthMode">
            {{ switchModeButtonCaption }}
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const email = ref('');
const password = ref('');
const mode = ref('login');
const formIsValid = ref(true);
const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  formIsValid.value = true;
  if (
    email.value === '' ||
    !email.value.includes('@') ||
    password.value.length < 6
  ) {
    formIsValid.value = false;
    return;
  }

  if (mode.value === 'signup') {
    await authStore.register(email.value, password.value);
  } else {
    await authStore.login(email.value, password.value);
  }

  if (authStore.token && authStore.userId) {
    router.push(`/${authStore.userId}/places`);
  } else {
    alert('Authentication failed!');
  }
};

const submitButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Login' : 'Signup';
});

const switchModeButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Signup instead' : 'Login instead';
});

const switchAuthMode = () => {
  mode.value = mode.value === 'login' ? 'signup' : 'login';
};
</script>
