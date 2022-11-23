<template>
  <div>
    <div class="version-item">
      <h3 class="version-item__name">
        v{{ version.name }}
      </h3>
      <p class="version-item__description">
        {{ version.description }}
      </p>
      <div class="version-item__tags">
        <p>HTTP</p>
        <p class="highlighted">
          REST
        </p>
      </div>
      <div
        v-if="version.developer"
        class="version-item__developer"
      >
        <img :src="version.developer.avatar">
        <div class="version-item__developer__info">
          <p class="version-item__developer__info__name">
            {{ nameShort }}
          </p>
          <p class="version-item__developer__info__date">
            {{ dateInDaysAgo }} days ago
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="!isLast"
      class="horizontal-line"
    >
      <hr>
    </div>
  </div>
</template>
<script lang="ts">
import { getDayDiff } from '@/helpers/getDayDiff'
import { Version } from '@/types/service.interface'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VersionDetails',
  props: {
    version: {
      type: Object as PropType<Version>,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const nameShort = computed(() => {
      return props.version.developer
        ? `${props.version.developer.name.split(' ')[0]} ${
          props.version.developer.name.split(' ')[1][0]
        }.`
        : ''
    })

    const dateInDaysAgo = computed(() => {
      const dateObj: Date = new Date(Date.parse(props.version.updated_at))
      return getDayDiff(dateObj, new Date())
    })

    return { nameShort, dateInDaysAgo }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.version-item {
  display: flex;
  &__name {
    flex: 1 1 10%;
  }
  &__description {
    flex: 0 1 40%;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8a8a8a;
  }
  &__tags {
    flex: 0 1 30%;
    display: flex;
    align-items: flex-start;
    padding: 0 6px;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #1155cb;
    p {
      border-radius: 4px;
      padding: 1.5px 6px 2.5px;
    }
    &:not(:first-child) {
      margin-left: 4px;
    }
    .highlighted {
      background-color: #bdd3f9;
    }
  }
  &__developer {
    display: flex;
    flex: 1 0 20%;
    img {
      width: 20px;
      height: 20px;
      border-radius: 30px;
    }
    &__info {
      margin-left: $d-tiny;
      &__name {
        font-weight: 600;
        font-size: 13px;
        line-height: 24px;
      }
      &__date {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8a8a8a;
      }
    }
  }
}
.horizontal-line {
  padding: $d-tiny 0;
  hr {
    margin: 0;
    background-color: #f1f1f5;
    height: 1px;
    border: none;
  }
}
</style>
