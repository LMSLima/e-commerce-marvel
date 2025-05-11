import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(true);
  const minimumLoadTime = 4000; // 4 segundos mínimo
  let loadStartTime = Date.now();

  const finishLoading = () => {
    const elapsed = Date.now() - loadStartTime;
    const remaining = Math.max(0, minimumLoadTime - elapsed);
    
    setTimeout(() => {
      isLoading.value = false;
    }, remaining);
  };

  const startLoading = () => {
    isLoading.value = true;
    loadStartTime = Date.now();
  };

  return { isLoading, finishLoading, startLoading };
});