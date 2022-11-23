<template>
  <div class="service-catalog">
    <div class="service-catalog__header">
      <div class="service-catalog__header__left">
        <h1>Service Hub</h1>
        <p class="service-catalog__header__left__subtext">
          Organize services, manage and track versioning and API service
          documentation. <a href="#">Learn more</a>
        </p>
      </div>
      <div class="service-catalog__header__right">
        <div class="service-catalog__header__right__search-input">
          <input
            v-model="searchQuery"
            placeholder="Search"
          >
          <img
            class="service-catalog__header__right__search-input__icon"
            src="@/assets/svgs/search.svg"
          >
        </div>
        <button
          class="service-catalog__header__right__add-service"
          @click="openCreateServiceAlert"
        >
          <img
            class="service-catalog__header__right__add-service__icon"
            src="@/assets/svgs/plus.svg"
          >
          <span class="show-desktop">Service Package</span>
        </button>
      </div>
    </div>
    <div
      v-if="loading"
      class="loading-spinner-container"
    >
      <LoadingEllipsis />
    </div>
    <div v-else>
      <div v-if="currentPageList.length > 0">
        <ul class="catalog">
          <ServiceCard
            v-for="service in currentPageList"
            :key="service.id"
            class="service-card"
            :service="service"
            @click="navigateToServicePage(service.id)"
          />
        </ul>
        <div class="pagination-controls">
          <button
            class="prev"
            :disabled="!prevPageAvailable"
            @click="previousPage"
          >
            <ArrowRight class="icon" />
          </button>
          <div class="pagination-text">
            <p class="items-range">
              {{ rangeStart }} to {{ rangeEnd }}
            </p>
            <p class="items-total">
              of {{ itemsCount }} services
            </p>
          </div>
          <button
            class="next"
            :disabled="!nextPageAvailable"
            @click="nextPage"
          >
            <ArrowRight class="icon" />
          </button>
        </div>
      </div>
      <div
        v-else
        class="catalog-empty"
      >
        <p>No matches found</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, ref, watch } from 'vue'
import useServices from '@/composables/useServices'
import usePagination from '@/composables/usePagination'
import ServiceCard from '@/components/ServiceCard.vue'
import LoadingEllipsis from '@/components/display/LoadingEllipsis.vue'
import ArrowRight from '@/components/display/svgs/ArrowRight.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCard,
    LoadingEllipsis,
    ArrowRight,
  },
  setup() {
    const router = useRouter()
    // Import services from the composable
    const { alphabticallySortedServices, loading, getServices } = useServices()

    const itemsPerPage = ref(9)
    onBeforeMount(() => {
      if (window.innerWidth >= 1390) {
        itemsPerPage.value = 9
      } else if (window.innerWidth >= 908) {
        itemsPerPage.value = 8
      } else {
        itemsPerPage.value = 5
      }
      window.addEventListener('resize', resizeHandler)
    })
    const resizeHandler = () => {
      if (window.innerWidth >= 1390) {
        itemsPerPage.value = 9
      } else if (window.innerWidth >= 908) {
        itemsPerPage.value = 8
      } else {
        itemsPerPage.value = 5
      }
    }
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    const {
      currentPageList,
      prevPageAvailable,
      nextPageAvailable,
      previousPage,
      nextPage,
      rangeStart,
      rangeEnd,
      itemsCount,
      resetCurrentPage,
    } = usePagination(alphabticallySortedServices, itemsPerPage)

    // Search input
    const searchQuery = ref('')
    const timerId = ref()

    watch(searchQuery, async (newVal: string, oldVal: string) => {
      clearTimeout(timerId.value)
      timerId.value = setTimeout(() => {
        if (newVal.trim() !== oldVal.trim()) {
          getServices(newVal)
          resetCurrentPage()
        }
      }, 500)
    })

    // Create Service Package
    const openCreateServiceAlert = (): void => {
      window.alert('Creating Service Package')
    }
    // Create Service Package
    const navigateToServicePage = (id: string): void => {
      router.push({ name: 'serviceDetails', params: { id } })
    }

    return {
      alphabticallySortedServices,
      loading,
      searchQuery,
      openCreateServiceAlert,
      navigateToServicePage,
      currentPageList,
      prevPageAvailable,
      nextPageAvailable,
      previousPage,
      nextPage,
      rangeStart,
      rangeEnd,
      itemsCount,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.service-catalog {
  padding: $d-small;
  @include breakpoint(medium) {
    padding: $d-medium;
  }

  &__header {
    display: flex;
    flex-direction: column;
    @include breakpoint(medium) {
      align-items: flex-start;
      flex-direction: row;
    }
    &__left {
      margin-right: $d-medium;
      color: #3c4557;
      flex: 1;
      &__subtext {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
    }
    &__right {
      display: flex;
      justify-content: space-between;
      margin-top: $d-x-small;
      @include breakpoint(medium) {
        margin: 0;
        justify-content: space-between;
      }
      &__search-input {
        position: relative;
        box-sizing: border-box;
        z-index: 0;
        margin-right: $d-small;
        input {
          background: #ffffff;
          height: 44px;
          display: block;
          box-sizing: border-box;
          padding: 10px 16px 10px 32px;
          text-align: left;
          border: 1px solid #e7e7ec;
          border-radius: 4px;
          @include breakpoint(medium) {
            min-width: 209px;
          }
        }
        &__icon {
          width: 20px;
          height: 20px;
          padding: $d-xx-small $d-tiny;
          position: absolute;
          bottom: 0;
          z-index: 1;
        }
      }
      &__add-service {
        display: flex;
        align-items: center;
        padding: $d-xx-small;
        background: #07a88d;
        border-radius: 100px;
        color: #ffffff;
        border: none;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        @include breakpoint(medium) {
          padding: $d-xx-small $d-small;
        }
      }
    }
  }
}
.catalog {
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: $d-small;
  @include breakpoint(x-small) {
    grid-template-columns: repeat(auto-fit, minmax(410px, 1fr));
  }
  .service-card {
    cursor: pointer;
  }
}
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: $d-small;
  .pagination-text {
    padding: $d-xx-small $d-small;
  }
  .items-range,
  .items-total {
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    color: #3c4557;
    display: inline;
  }
  .items-total {
    opacity: 0.7;
  }
  button {
    background: none;
    padding: $d-xx-small;
    border: 1px solid #a6c6ff;
    border-radius: 100px;
    svg {
      fill: #1456cb;
    }

    &:disabled {
      cursor: not-allowed;
      border: 1px solid rgba(0, 0, 0, 0.1);
      svg {
        fill: rgba(0, 0, 0, 0.25);
      }
    }
    &.prev {
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
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
