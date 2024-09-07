<template>
  <div>
    <v-card>
      <v-layout>
        <v-app-bar color="accent" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>My Places</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-if="$vuetify.display.mdAndUp">
            <v-row>
              <v-col
                v-for="item in filteredNavigationItems"
                :key="item.value"
                class="d-flex align-center"
              >
                <v-btn :to="item.value" text activeClass>
                  {{ item.title }}
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'left' : undefined"
          temporary
        >
          <v-list>
            <v-list-item
              v-for="item in filteredNavigationItems"
              :key="item.value"
              :to="item.value"
              activeClass
            >
              {{ item.title }}
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <slot />
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

const drawer = ref(false);
const group = ref(null);

const userId = computed(() => authStore.userId);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const navigationItems = computed(() => [
  {
    title: 'All Users',
    value: '/',
    requiresAuth: false,
    hideWhenAuthenticated: false,
  },
  {
    title: 'My Places',
    value: `/${userId.value}/places`,
    requiresAuth: true,
    hideWhenAuthenticated: false,
  },
  {
    title: 'Add Place',
    value: '/places/new',
    requiresAuth: true,
    hideWhenAuthenticated: false,
  },
  {
    title: 'Authenticate',
    value: '/authenticate',
    requiresAuth: false,
    hideWhenAuthenticated: true,
  },
]);

const filteredNavigationItems = computed(() =>
  navigationItems.value.filter(
    (item) =>
      (!item.requiresAuth || isAuthenticated.value) &&
      (!item.hideWhenAuthenticated || !isAuthenticated.value)
  )
);

watch(group, () => {
  drawer.value = false;
});
</script>

<style lang="scss" scoped></style>
