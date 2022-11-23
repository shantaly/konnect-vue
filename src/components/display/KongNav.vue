
<template>
  <nav class="nav-container">
    <div class="content-container">
      <div
        class="nav-section nav-left"
        @click="$emit('navLeftClicked')"
      >
        <slot name="nav-left-content" />
      </div>
      <div class="nav-section nav-right">
        <slot name="nav-right-content" />
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KonnectNav',
  emits: ['navLeftClicked'],
})
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';
.nav-container {
  z-index: 10;
  position: relative;
  @include blue-gradient();
}
.content-container {
  max-width: $content-width;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.nav-section {
  display: flex;
  align-items: center;
}
.nav-left {
  cursor: pointer;
  justify-content: flex-start;
}
.nav-right {
  justify-content: flex-end;
}
</style>
