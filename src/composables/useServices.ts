import { ref, onBeforeMount, computed } from 'vue'
import axios from 'axios'
import { Service } from '@/types/service.interface'

// This composable is a simplified example for the exercise.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices(bootSearch = ''): any {
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)

  const getServices = async (searchText = ''): Promise<any> => {
    // Initialize loading state
    loading.value = true

    // Fetch data from the API
    const result = await axios.get(`/api/services?q=${searchText}`)

    // Store data in Vue ref
    services.value = result.data

    // Reset loading state
    loading.value = false
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices(bootSearch)
  })

  const alphabticallySortedServices = computed((): Array<Service> => {
    return services.value.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  })

  // Return stateful data
  return {
    services,
    loading,
    getServices,
    alphabticallySortedServices,
  }
}
