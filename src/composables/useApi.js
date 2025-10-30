import { onMounted, ref } from 'vue'

export function useApi(apiFunction, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const { immediate = false, initialParams = [], onSuccess = null, onError = null } = options

  const execute = async (...params) => {
    loading.value = true
    error.value = null
    try {
      const result = await apiFunction(...params)
      data.value = result
      if (onSuccess) {
        onSuccess(result)
      }
      return result
    } catch (error) {
      error.value = error
      if (onError) {
        onError(error)
      }
      throw error
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    onMounted(() => {
      execute(...initialParams)
    })
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}
