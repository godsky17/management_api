import { apiClient } from './api'

export const userService = {
  async getUsers(params = {}) {
    const queryString = params.nextPage ? params.nextPage : null
    const endpoint = queryString ? `/users?page=${queryString}` : '/users'
    return apiClient.get(endpoint, params.nextPage)
  },

  async getUserById(id) {
    if (!id) throw new Error('ID utilisateur requis')
    return apiClient.get(`/users/${id}`)
  },

  async createUser(userData) {
    // Ajouter les verification sur les champs (ici c'est fait uniquement sur le champ email)
    if (!userData.email) {
      throw new Error('Email requis')
    }

    return apiClient.post('/users', userData)
  },

  async updateUser(id, userData) {
    return apiClient.patch(`/users/${id}`, userData)
  },

  async deleteUser(id) {
    if (!id) throw new Error('ID utilisateur requis')
    return apiClient.delete(`/users/${id}`)
  },
}
