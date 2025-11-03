<template>
  <h1 v-if="customersLaoding" class="text-center">Chargement...</h1>
  <h1 v-else-if="customersError" class="text-center text-red-600">{{ customersError }}</h1>
  <div v-else class="bg-white p-5 rounded-xl shadow-2xl mr-[2%]">
    <div class="flex justify-between align-center mb-10">
      <h1 class="font-bold text-2xl">Customer List</h1>
      <button class="bg-blue-300 hover:bg-blue-500 px-3 py-2 rounded-xl hover:cursor-pointer">Add Customer</button>
    </div>
    <!-- {{ customers }} -->
    <div v-if="customers?.data">
      <div>
        <form @submit.prevent="filter">
          <div class="flex align-center justify-left p-1 px-5 bg-stone-200 rounded-2xl w-[80%] m-auto gap-2 mb-10">
            <img src="https://img.icons8.com/?size=20&id=59878&format=png&color=000000" alt="search icon">
            <select v-model="formDatas.type" class="border-0 outline-0">
              <option disabled value="">-- Choisir un type --</option>
              <option value="email">Email</option>
              <option value="name">Name</option>
              <option value="postaleCode">Code postal</option>
              <option value="state">State</option>
              <option value="address">Address</option>
            </select>
            <input v-model="formDatas.value" type="text" class="border-0 outline-0 bg-stone-200 w-full"
              placeholder="Search">
            <button type="submit"
              class="bg-white  hover:bg-stone-100 p-1 px-2 cursor-pointer rounded min-w-[100px] ">Search</button>
          </div>
        </form>
      </div>
      <ul>
        <li v-for="customer in customers.data" :key="customer.id"
          class="p-1.5 align-center grid grid-cols-4 hover:bg-blue-200 hover:rounded-xl hover:cursor-pointer">
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
          <div>
            <RouterLink :to="`/customers/${customer.id}`" class="bg-blue-300 p-2 rounded-xl hover:cursor-pointer">
              See more
            </RouterLink>
          </div>
        </li>
      </ul>
    </div>

    <!-- Paginate controller -->
    <div class="text-center mt-10">
      <p>
        <button @click="prevPage"
          :class="[customers?.links.prev ? 'cursor-pointer' : 'cursor-not-allowed text-stone-400']">
          << </button>
            {{ customers?.meta.current_page }} sur {{ customers?.meta.last_page }}
            <button @click="nextPage"
              :class="[customers?.links.next ? 'cursor-pointer' : 'cursor-not-allowed text-stone-400']">
              >>
            </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { customerService } from '@/services/customer.service'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const {
  data: customers,
  laoding: customersLaoding,
  error: customersError,
  execute: fetchCustomers,
} = useApi(customerService.getCustomers)
const formDatas = ref({
  type: '',
  value: ''
})

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

async function filter() {
  let options = {}
  if (formDatas.value.type && formDatas.value.value) {

    if (formDatas.value.type === 'email') {
      options = {
        email: formDatas.value.value
      }
    } else if (formDatas.value.type === 'postaleCode') {
      options = {
        postaleCode: formDatas.value.value
      }
    } else if (formDatas.value.type === 'name') {
      options = {
        name: formDatas.value.value
      }
    } else if (formDatas.value.type === 'state') {
      options = {
        state: formDatas.value.value
      }
    } else if (formDatas.value.type === 'address') {
      options = {
        address: formDatas.value.value
      }
    }
    router.push(`/customers?${formDatas.value.type}[eq]=${formDatas.value.value}`)
    await fetchCustomers(options)
  }
}

watch(
  () => route.query.page,
  async () => {
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

<style>
.align-center {
  align-items: center;
}
</style>
