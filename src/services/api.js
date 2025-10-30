const API_BASE_URL = import.meta.env.VITE_API_URL

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const apiClient = {
  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          errorData.message || `Erreur HTTP ${response.status}`,
          response.status,
          errorData,
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) throw error

      throw new ApiError('Impossible de contacter le serveur', 0, error)
    }
  },

  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'GET' })
  },

  post(endpoint, data, options) {
    return this.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) })
  },

  put(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  patch(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  },
}
