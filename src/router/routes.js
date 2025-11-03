import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/home-page.vue'
import CustomersList from '../views/customers/customers-list.vue'
import CustomerDetails from '../views/customers/customer-details.vue'
import CustomerAdd from '../views/customers/customer.vue'
import CustomerUpdate from '../views/customers/customer-update.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/customers', component: CustomersList },
  { path: '/customers/:id', component: CustomerDetails },
  { path: '/customer/add', component: CustomerAdd },
  { path: '/customer/update/:id', component: CustomerUpdate },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
