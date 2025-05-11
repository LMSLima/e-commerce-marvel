<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopCart from './Desktop/DesktopCart.vue'
  import MobileCart from './Mobile/MobileCart.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopCart v-if="!isMobile" />
    <MobileCart v-else />
  </div>
</template>

<style scoped>

</style>
