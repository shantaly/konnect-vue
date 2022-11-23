
<template>
  <div class="service-footer">
    <div v-if="isConfigured && service.metrics">
      <div class="service-footer__item">
        <StatusIndicator />
        <p class="service-footer__item__value">
          {{ calculatedMetrics.latency.toFixed(2) }}ms
        </p>
        <p class="service-footer__item__label">
          latency
        </p>
      </div>
      <div class="service-footer__item">
        <StatusIndicator />
        <p class="service-footer__item__value">
          {{ calculatedMetrics.uptime.toFixed(2) }}%
        </p>
        <p class="service-footer__item__label">
          uptime
        </p>
      </div>
      <div class="service-footer__item">
        <StatusIndicator />
        <p class="service-footer__item__value">
          {{ calculatedMetrics.requests.toFixed(2) }}k
        </p>
        <p class="service-footer__item__label">
          requests
        </p>
        <p class="service-footer__item__label">
          •
        </p>
        <p class="service-footer__item__value">
          {{ calculatedMetrics.errors.toFixed(2) }}%
        </p>
        <p class="service-footer__item__label">
          errors
        </p>
      </div>
    </div>
    <div v-else>
      <div class="service-footer__item">
        <StatusIndicator class="icon-inactive" />
        <p class="service-footer__item__label">
          Not configured with runtime yet
        </p>
      </div>
    </div>
    <div
      v-if="developersCount"
      class="developers"
    >
      <div
        v-for="dev in visableDevs"
        :key="dev.id"
        class="developer"
      >
        <img
          class="developer__avatar"
          :src="dev.avatar"
        >
      </div>
      <div
        v-if="hiddenDevCount > 0"
        class="developer"
      >
        <div class="developer__badge">
          +{{ hiddenDevCount }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import useService from '@/composables/useService'
import { Developer, Service } from '@/types/service.interface'
import { computed, defineComponent, PropType, ref } from 'vue'
import StatusIndicator from '@/components/display/svgs/StatusIndicator.vue'

export default defineComponent({
  name: 'ServiceCardFooter',
  components: {
    StatusIndicator,
  },
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  setup(props) {
    const { calculatedMetrics, isConfigured, sortedUniqueDevelopers } =
      useService(props.service)

    const developersCount = ref(sortedUniqueDevelopers.length)
    const visableDevs = computed(() =>
      sortedUniqueDevelopers.filter((d: Developer, index: number) => index < 2),
    )
    const hiddenDevCount = ref(developersCount.value - 2)
    return {
      calculatedMetrics,
      isConfigured,
      sortedUniqueDevelopers,
      developersCount,
      hiddenDevCount,
      visableDevs,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';
.service-footer {
  padding-left: 10px;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  &__item {
    display: flex;
    align-items: center;
    .icon-inactive {
      fill: #b6b6bd;
    }
    &__value,
    &__label {
      margin-left: $d-tiny;
      font-style: normal;
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
    }
    &__label {
      color: #707888;
    }
  }
}

.developers {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
}
.developer {
  &:nth-child(2n + 0) {
    transform: translateX(12px);
  }
  &:nth-child(3n + 0) {
    transform: translateX(24px);
  }
  &__badge,
  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 30px;
    mix-blend-mode: normal;
  }
  &__badge {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1f1f8;
    border: 2px solid #ffffff;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 2px;
    color: #777d8a;
  }
}

@include breakpoint(x-small) {
  .service-footer {
    flex-direction: row;
    align-items: flex-end;
  }
  .developers {
    flex: 1;
  }
}
</style>
