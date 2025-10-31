import { apiClient } from './api'

export const customerService = {
  async getCustomers(params = {}) {
    let endpoint = '/customers'
    if (params.page) {
      endpoint = '/customers?page=' + params.page
    }
    return apiClient.get(endpoint)
  },

  getCustomerById(id, params = {}) {
    if (!id) throw new Error('ID utilisateur requis')
    let endpoint = `/customers/${id}`
    if (params.includeInvoices) {
      endpoint += '?includeInvoices=true'
    }
    return apiClient.get(endpoint)
  },
}
