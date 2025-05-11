<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();


</script>

<template>
  <v-container class="pa-0 pt-4" fluid> 
    <v-bottom-navigation app grow>
      <v-btn 
        @click="$router.push('/home')"
        :color="route.path === '/home' ? 'red-darken-4' : ''"
      >
        <span><v-icon>mdi-home</v-icon></span>
      </v-btn>
      
      <v-btn 
        @click="$router.push('/list-person')"
        :color="route.path === '/list-person' ? 'red-darken-4' : ''"
      >
        <span><v-icon>mdi-view-grid</v-icon></span>
      </v-btn>

      <v-btn  
        @click="$router.push('/cart')" 
        :color="route.path === '/cart' ? 'red-darken-4' : ''"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<style scoped>
.fab-button {
  margin-top: -24px;
}

.v-btn--active {
  color: #d32f2f !important;
}
</style>