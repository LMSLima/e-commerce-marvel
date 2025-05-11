<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopHeader from './Desktop/DesktopHeader.vue'
  import MobileHeader from './Mobile/MobileHeader.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopHeader v-if="!isMobile" />
    <MobileHeader v-else />
  </div>
</template>

<style scoped>

</style>
