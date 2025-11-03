import { apiClient } from './api'

export const customerService = {
  async getCustomers(params = {}) {
    let endpoint = '/customers'
    if (params.page) {
      endpoint += '?page=' + params.page
    }

    if (params.name) {
      endpoint += '?name=' + params.name
    }

    if (params.postaleCode) {
      endpoint += '?postaleCode[eq]=' + params.postaleCode
    }

    if (params.email) {
      endpoint += '?email[eq]=' + params.email
    }

    if (params.state) {
      endpoint += '?state[eq]=' + params.state
    }

    if (params.address) {
      endpoint += '?address[eq]=' + params.address
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
