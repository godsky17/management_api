import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/home-page.vue'
import CustomersList from '../views/customers/customers-list.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/customers', component: CustomersList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
