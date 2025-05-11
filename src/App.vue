<script setup>
import { LoadingPage } from './components';
import { useLoadingStore } from './stores/loading';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const loadingStore = useLoadingStore();
const route = useRoute();

onMounted(() => {
  setTimeout(loadingStore.finishLoading, 2000);
});

watch(() => route.path, () => {
  loadingStore.startLoading();
  setTimeout(loadingStore.finishLoading, 2000); 
});
</script>

<template>
  <v-app>
    <v-theme-provider>
      <LoadingPage v-if="loadingStore.isLoading" />
      <RouterView v-show="!loadingStore.isLoading" />
    </v-theme-provider>
  </v-app>
</template>