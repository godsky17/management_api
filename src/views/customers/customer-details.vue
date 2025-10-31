<template>
    <h1 class="text-center" v-if="customerLaoding">Chargement...</h1>
    <h1 class="text-center" v-else-if="customerErrors">{{ customerErrors }}</h1>
    <div v-else class="bg-white p-5 shadow-2xl rounded-xl mr-[2%]">
        <h1 class="font-bold text-2xl mb-5">Customer details</h1>
        <!-- CARD INFORMATIONS -->
        <div class="p-5">
            <div v-if="customerDetails?.data" class="grid grid-cols-3">
                <div class="col-span-2">
                    <ul>
                        <li>
                            <div class="grid grid-cols-4 p-2">
                                <p class="col-span-1 font-bold">Name :</p>
                                <p class="col-span-2">{{ customerDetails?.data.name }}</p>
                            </div>
                        </li>
                        <li>
                            <div class="grid grid-cols-4 p-2">
                                <p class="col-span-1 font-bold">Email :</p>
                                <p class="col-span-2">{{ customerDetails?.data.email }}</p>
                            </div>
                        </li>
                        <li>
                            <div class="grid grid-cols-4 p-2">
                                <p class="col-span-1 font-bold">State :</p>
                                <p class="col-span-2">{{ customerDetails?.data.state }}</p>
                            </div>
                        </li>
                        <li>
                            <div class="grid grid-cols-4 p-2">
                                <p class="col-span-1 font-bold">City :</p>
                                <p class="col-span-2">{{ customerDetails?.data.city }}</p>
                            </div>
                        </li>
                        <li>
                            <div class="grid grid-cols-4 p-2">
                                <p class="col-span-1 font-bold">Address :</p>
                                <p class="col-span-2">{{ customerDetails?.data.address }}</p>
                            </div>
                        </li>
                    </ul>

                </div>
                <div class="p-5" v-if="statistics.is">
                    <!-- STATISTICS -->
                    <div class="w-full p-5 bg-black text-white rounded my-1 mt-0">
                        <p class="text-3xl font-bold">{{ statistics.total.toLocaleString('en-US') }} $</p>
                        <p>Total depense</p>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div class="w-full p-5 bg-green-500 text-white rounded my-1">
                            <p class="text-xl font-bold">{{ customerDetails.data.invoices?.length ?? "--" }}</p>
                            <p>Invoices</p>
                        </div>
                        <div class="w-full p-5 bg-red-500 text-white rounded my-1">
                            <p class="text-xl font-bold">{{ statistics.pending.toLocaleString('en-US') }} $</p>
                            <p>Pending</p>
                        </div>
                    </div>

                </div>
            </div>
            <h1 v-else>Chargement...</h1>

        </div>

        <!-- INVOICES -->
        <div v-if="customerDetails?.data.invoices" class="mt-10 p-5">
            <h2 class="font-bold">Invoices</h2>
            <!-- INVOICES LIST -->
            <div class="mt-5">
                <ul>
                    <li v-for="invoice in customerDetails.data.invoices" :key="invoice.id"
                        class="flex justify-between my-3 align-middle border-1 p-5 py-2 rounded-xl hover:cursor-pointer">
                        <div>
                            <h3>Invoices - {{ Date.parse(invoice.billedDate) }}</h3>
                            <p class="font-bold">{{ invoice.amount }} $</p>
                            <p v-if="invoice.paidDate" class="text-[12px] italic">Paid at {{ invoice.paidDate }}</p>
                        </div>
                        <div>
                            <p
                                :class="[invoice.paidDate ? 'bg-green-500' : 'bg-red-500', 'p-1 my-auto min-w-[100px] max-w-[150px] text-center rounded-2xl font-bold text-white']">
                                {{ invoice.paidDate ? "Paid" : "Not Paid" }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <button @click="getInvoices" class="w-full p-2 cursor-pointer bg-blue-200 mt-5 rounded">
            {{ customerDetails?.data.invoices ? "Hide Invoices" : "View Invoices" }}
        </button>
    </div>

</template>
<script setup>
import { useApi } from '@/composables/useApi'
import { customerService } from '@/services/customer.service'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const customer_id = ref('')
const statistics = ref({
    pending: "--",
    total: "--",
    is: false
})
const {
    data: customerDetails,
    laoding: customerLaoding,
    error: customerErrors,
    execute: fetchCustomerDetails,
} = useApi(customerService.getCustomerById)

function getInvoices() {
    if (route.query.includeInvoices) {
        router.push(`/customers/${customer_id.value}`)
    } else {
        router.push(`/customers/${customer_id.value}?includeInvoices=true`)
    }
}

const getStatistics = () => {
    statistics.value.is = true
    setTimeout(() => {
        if (customerDetails.value?.data?.invoices) {
            statistics.value.total = customerDetails.value.data.invoices.reduce(
                (accumulator, currentValue) => accumulator + currentValue.amount,
                0
            )

            statistics.value.pending = customerDetails.value.data.invoices.reduce(
                (sum, invoice) => {
                    if (invoice.status === 'B' || invoice.paidDate === null) {
                        sum += invoice.amount
                    }
                    return sum
                },
                0
            )
        }
    }, 3000)
}

const destroyStats = () => {
    statistics.value.is = false
}

watch(
    () => route.query.includeInvoices,
    () => {
        if (route.query.includeInvoices) {
            fetchCustomerDetails(customer_id.value, route.query)
            getStatistics()
        } else {
            fetchCustomerDetails(customer_id.value)
            destroyStats()
        }
    }
)

onMounted(async () => {
    customer_id.value = route.params.id
    if (!customer_id.value) {
        console.log('Aucun identifiant disponible.')
        router.push('/customers')
    }

    try {
        if (route.query.includeInvoices) {
            await fetchCustomerDetails(customer_id.value, route.query)
            getStatistics()
        } else {
            await fetchCustomerDetails(customer_id.value)
            destroyStats()
        }
        if (customerDetails) {
            console.log('Donnees chargees')
        }
    } catch (error) {
        console.log("Une erreur s'est produite au cours du chargement des donnees : " + error)
    }
})
</script>
