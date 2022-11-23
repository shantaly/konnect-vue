<template>
  <div class="service-page">
    <div
      v-if="loading"
      class="loading-spinner-container"
    >
      <LoadingEllipsis />
    </div>
    <div v-else>
      <ServiceDetails
        v-if="service"
        :service="service"
      />
      <div
        v-else
        class="catalog-empty"
      >
        <p>Invalid Service ID</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useServices from '@/composables/useServices'
import { defineComponent, computed } from 'vue'
import ServiceDetails from '@/components/ServiceDetails.vue'
import LoadingEllipsis from '@/components/display/LoadingEllipsis.vue'

export default defineComponent({
  name: 'ServicePage',
  components: {
    ServiceDetails,
    LoadingEllipsis,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { services, loading } = useServices(props.id)

    const firstElement = computed(() => {
      return services.value.at(0)
    })

    return { service: firstElement, loading }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.service-page{
  padding: $d-small;
  @include breakpoint(medium) {
    padding: $d-medium;
  }
}

.loading-spinner-container,
.catalog-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.catalog-empty {
  height: 300px;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
}
</style>
