<template>
  <li class="service">
    <div class="service__header">
      <div class="service__header__status">
        <img
          class="service__header__status__icon"
          :src="statusObj.icon"
        >
        <p>
          {{ statusObj.title }}
        </p>
      </div>
      <div
        v-if="versionsCount > 0"
        class="service__header__versions"
      >
        {{ versionsCount }} versions
      </div>
    </div>
    <div class="service__body">
      <p class="service__body__name">
        {{ service.name }}
      </p>
      <p class="service__body__desc">
        {{ service.description }}
      </p>
    </div>
    <ServiceCardFooter :service="service" />
  </li>
</template>
<script lang="ts">
import { Service } from '@/types/service.interface'
import { defineComponent, PropType } from 'vue'
import ServiceCardFooter from '@/components/ServiceCardFooter.vue'
import useService from '@/composables/useService'

export default defineComponent({
  name: 'ServiceCard',
  components: {
    ServiceCardFooter,
  },
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  setup(props) {
    const {
      statusObj,
      versionsCount,
      calculatedMetrics,
      isConfigured,
      isPublished,
    } = useService(props.service)

    return {
      statusObj,
      versionsCount,
      calculatedMetrics,
      isConfigured,
      isPublished,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.service {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 2px;
  padding: $d-small $d-medium-small;
  height: 232px;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: $d-tiny;
    &__status {
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #3C4557;
      opacity: 0.7;
      &__icon {
        width: 20px;
        height: 20px;
      }
      p {
        margin-left: 5px;
      }
    }
    &__versions {
      background: #f2f6fe;
      padding: $d-tiny $d-x-small;
      border-radius: 100px;
      color: #5888db;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
    }
  }

  &__body {
    padding-left: 10px;
    &__name {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #3C4557;
      margin-bottom: $d-xx-small;
    }
    &__desc {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #707888;
    }
  }
}
</style>
