<template>
  <header>
    <KonnectNav />
  </header>
  <main class="main-page-wrapper">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KonnectNav from '@/components/KonnectNav.vue'

export default defineComponent({
  name: 'App',
  components: {
    KonnectNav,
  },
})
</script>

<style lang="scss">
@import '@/styles/main.scss';

</style>
