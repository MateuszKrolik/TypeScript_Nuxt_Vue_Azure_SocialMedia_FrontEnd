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
                v-for="item in items"
                :key="item.value"
                class="d-flex align-center"
              >
                <v-btn text @click="navigateTo(item.value)">
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
              v-for="item in items"
              :key="item.value"
              @click="navigateTo(item.value)"
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
const items = [
  {
    title: 'All Users',
    value: '/',
  },
  {
    title: 'My Places',
    value: '/',
  },
  {
    title: 'Add Place',
    value: '/places/new',
  },
  {
    title: 'Authenticate',
    value: '/',
  },
];

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>

<style lang="scss" scoped></style>
