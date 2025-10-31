import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/home-page.vue'
import CustomersList from '../views/customers/customers-list.vue'
import CustomerDetails from '../views/customers/customer-details.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/customers', component: CustomersList },
  { path: '/customers/:id', component: CustomerDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
