import { ref, computed, Ref } from 'vue'

export default function usePagination(list: Ref<Array<any>>, itemsPerPage: Ref<number>): any {
  const currentPage = ref<number>(1)

  const itemsCount = computed(() => list.value.length)
  const totalPages = computed(() =>
    Math.ceil(itemsCount.value / itemsPerPage.value),
  )

  const rangeStart = computed(() => ((currentPage.value - 1) * itemsPerPage.value) + 1)
  const rangeEnd = computed(() => (currentPage.value - 1) * itemsPerPage.value + itemsPerPage.value > itemsCount.value ? itemsCount.value : (currentPage.value - 1) * itemsPerPage.value + itemsPerPage.value)

  const currentPageList = computed(() => {
    return list.value.slice(rangeStart.value - 1, rangeEnd.value)
  })

  const prevPageAvailable = computed(() => currentPage.value > 1)
  const nextPageAvailable = computed(
    () => currentPage.value < totalPages.value,
  )

  const previousPage = (): void => {
    if (prevPageAvailable.value) currentPage.value = currentPage.value - 1
  }

  const nextPage = (): void => {
    if (nextPageAvailable.value) currentPage.value = currentPage.value + 1
  }

  const resetCurrentPage = (): void => {
    currentPage.value = 1
  }

  return {
    currentPageList,
    prevPageAvailable,
    nextPageAvailable,
    previousPage,
    nextPage,
    rangeStart,
    rangeEnd,
    itemsCount,
    resetCurrentPage,
  }
}
