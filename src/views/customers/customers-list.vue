<template>
  <h1 v-if="customersLaoding" class="text-center">Chargement...</h1>
  <h1 v-else-if="customersError" class="text-center text-red-600">{{ customersError }}</h1>
  <div v-else>
    <h1 class="font-bold text-2xl mb-5">Customer List</h1>
    <!-- {{ customers }} -->
    <div v-if="customers?.data">
      <ul>
        <li
          v-for="customer in customers.data"
          :key="customer.id"
          class="p-1.5 grid grid-cols-3 hover:bg-blue-200 hover:rounded-xl hover:cursor-pointer"
        >
          <div>
            <p>{{ customer.name }}</p>
            <span class="text-[15px] italic text-stone-500">{{ customer.email }}</span>
          </div>
          <div>
            <p>{{ customer.state }}, {{ customer.city }}</p>
            <span>{{ customer.address }}</span>
          </div>
          <div>
            <p>+{{ customer.postaleCode }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Paginate controller -->
    <div class="text-center mt-10">
      <p>
        <button
          @click="prevPage"
          :class="[customers?.links.prev ? 'cursor-pointer' : 'cursor-not-allowed text-stone-400']"
        >
          <<
        </button>
        {{ customers?.meta.current_page }} sur {{ customers?.meta.last_page }}
        <button
          @click="nextPage"
          :class="[customers?.links.next ? 'cursor-pointer' : 'cursor-not-allowed text-stone-400']"
        >
          >>
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { customerService } from '@/services/customer.service'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const {
  data: customers,
  laoding: customersLaoding,
  error: customersError,
  execute: fetchCustomers,
} = useApi(customerService.getCustomers)
const router = useRouter()
const route = useRoute()

function nextPage() {
  if (customers.value.links.next) {
    router.push('/customers?page=' + (customers.value.meta.current_page + 1))
  }
}

function prevPage() {
  if (customers.value.links.prev) {
    router.push('/customers?page=' + (customers.value.meta.current_page - 1))
  }
}

watch(
  () => route.query.page,
  async (new_page, old_page) => {
    console.log('Un changement a ete opere')
    await fetchCustomers(route.query)
  },
)

onMounted(async () => {
  try {
    if (route.query.page) {
      console.log('Je suis passe par ici')
      await fetchCustomers(route.query)
    } else {
      await fetchCustomers()
    }

    console.log('Donnee chargee' + customers)
  } catch (err) {
    console.log('Une erreur s_est produite au cours du chargement des donnee..' + err)
  }
})
</script>
