import { Developer, Metrics, Service, ServiceStatus, Version } from '@/types/service.interface'
import { ref, computed } from 'vue'
import spinnerIcon from '@/assets/svgs/spinner.svg'
import checkmarkIcon from '@/assets/svgs/checkmark.svg'
import closeIcon from '@/assets/svgs/close.svg'

export default function useService(service: Service): any {
  const isConfigured = ref(service.configured)
  const isPublished = ref(service.published)

  const statusObj = computed((): ServiceStatus => {
    if (!isConfigured.value) return { title: 'In progress', icon: spinnerIcon }
    if (isPublished.value) {
      return { title: 'Published to portal', icon: checkmarkIcon }
    }
    return { title: 'Unpublished', icon: closeIcon }
  })

  const versionsCount = computed((): number => {
    return service.versions?.length || 0
  })

  const sortedVersions = computed((): Array<Version> => {
    return service.versions?.sort((a: Version, b: Version) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
  })

  const sortedUniqueDevelopers = sortedVersions.value?.reduce((result: Array<Developer>, v) => {
    if (v.developer && !result.find(o => o.id === v.developer?.id)) {
      result.push(v.developer)
    }
    return result
  }, [])

  const calculatedMetrics = computed((): Metrics => {
    return {
      latency: service.metrics?.latency || 0,
      errors: (service.metrics?.errors || 0) * 100,
      uptime: (service.metrics?.uptime || 0) * 100,
      requests: (service.metrics?.requests || 0) / 1000,
    }
  })

  return {
    statusObj,
    versionsCount,
    calculatedMetrics,
    isConfigured,
    isPublished,
    sortedVersions,
    sortedUniqueDevelopers,
  }
}
