<template>
  <div class="service-details">
    <h2>Versions ({{ versionsCount }})</h2>
    <VersionDetails
      v-for="(version, index) in sortedVersions"
      :key="version.id"
      :is-last="index == versionsCount - 1"
      :version="version"
    />
  </div>
</template>
<script lang="ts">
import useService from '@/composables/useService'
import { Service } from '@/types/service.interface'
import { defineComponent, PropType } from 'vue'
import VersionDetails from '@/components/VersionDetails.vue'
export default defineComponent({
  name: 'ServicePage',
  components: {
    VersionDetails,
  },
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  setup(props) {
    const { versionsCount, sortedVersions } = useService(props.service)
    return { versionsCount, sortedVersions }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

h2 {
  margin-bottom: $d-medium-small;
}
</style>
