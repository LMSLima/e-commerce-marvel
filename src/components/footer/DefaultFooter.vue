<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopFooter from './Desktop/DesktopFooter.vue'
  import MobileFooter from './Mobile/MobileFooter.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopFooter v-if="!isMobile" />
    <MobileFooter v-else class="mt"/>
  </div>
</template>

<style scoped>
.mt{
  margin-top: 5rem;
}
</style>