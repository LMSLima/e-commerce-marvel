<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopPerson from './Desktop/DesktopPerson.vue'
  import MobilePerson from './Mobile/MobilePerson.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopPerson v-if="!isMobile" />
    <MobilePerson v-else />
  </div>
</template>

<style scoped>

</style>
