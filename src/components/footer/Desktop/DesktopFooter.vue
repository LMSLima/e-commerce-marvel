<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <v-footer
    class="bg-red-lighten-1 text-center pa-4"
  >
    <v-container>
      <span>© {{ currentYear }} Super Heróis - Todos os direitos reservados</span>
    </v-container>
  </v-footer>
</template>

<style scoped>
.v-footer {
  width: 100%;
  margin-top: auto; 
}
</style>