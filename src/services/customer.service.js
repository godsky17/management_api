import { apiClient } from './api'

export const customerService = {
  async getCustomers(params = {}) {
    let endpoint = '/customers'
    if (params.page) {
      endpoint = '/customers?page=' + params.page
    }
    return apiClient.get(endpoint)
  },
}
