<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import FormInput from '@/composants/forms/FormInput.vue';
import { customerService } from '@/services/customer.service';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const customerId = ref(null)
const error = ref({
    show: false,
    message: ""
});
const dataForms = ref({
    name: null,
    email: null,
    type: null,
    state: null,
    city: null,
    address: null,
    postaleCode: null,
})
const {
    data: customer,
    laoding: customerLaoding,
    error: customerError,
    execute: fetchCustomer
} = useApi(customerService.getCustomerById)
const {
    error: updateCustomerError,
    laoding: updateCustomerLaoding,
    execute: updtateCustomer
} = useApi(customerService.updateCustomer)
const router = useRouter()
const route = useRoute()


function traitment() {
    // Tchecking of Data from form
    if (!customer.value.data.name || !customer.value.data.email || !customer.value.data.type || !customer.value.data.state || !customer.value.data.city || !customer.value.data.address || !customer.value.data.postaleCode) {
        error.value.show = true
        error.value.message = "Veuillez remplir convenablement tout les champs !"
    } else if (!['I', 'i', 'B', 'b'].includes(customer.value.data.type)) {
        error.value.show = true
        error.value.message = "Donnees invalide !"
    }

    // Call and Save data
    try {
        // console.log(customer.value.data)
        updtateCustomer(customerId.value, customer.value.data)
        router.push('/customers')
    } catch (err) {
        console.log("Impossible d'enregistrer ! Error : " + err)
        error.value.message = "Impossible d'enregistrer !"
        error.value.show = true

    }
}

watch(
    () => error.value.show,
    () => {
        setTimeout(() => {
            error.value.show = false
        }, 3000);
    }
)

onMounted(() => {
    customerId.value = route.params.id
    try {
        if (customerId.value) {
            fetchCustomer(customerId.value)
            if (customer.value) {
                dataForms.value.name = customer.value.data.name
            }
        }
    } catch (err) {
        console.log('Erreur : ' + err)

    }
})

</script>

<template>
    <div class="bg-white p-5 shadow-2xl rounded-xl mr-[2%]">
        <h1 class="font-bold text-2xl mb-5">Customer details</h1>

        <div v-if="error.show" class="p-5 bg-red-400 text-white text-center rounded-xl mb-2.5">
            {{ error.message }}
        </div>
        <div v-if="customer?.data">
            <form @submit.prevent="traitment">
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <FormInput v-model="customer.data.name" name="name" type="text" label="Name"
                        placeholder="Enter name" />
                    <FormInput v-model="customer.data.email" name="email" type="text" label="email"
                        placeholder="Enter email" />
                </div>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div class="flex flex-col flex-1 bg-stone-200 rounded-xl p-1.5 px-5 cursor-text">
                        <label for="type" class="text-[10px] cursor-text w-full">Type</label>
                        <select v-model="customer.data.type" name="type" id="type">
                            <option disabled value="">-- Choisir un type --</option>
                            <option value="I">Individual</option>
                            <option value="B">Business</option>
                            <option value="e">Mauvais</option>
                        </select>
                    </div>
                    <FormInput v-model="customer.data.state" name="state" type="text" label="State"
                        placeholder="Enter State" />
                </div>
                <div class="grid grid-cols-3 gap-2 mb-2">
                    <FormInput v-model="customer.data.city" name="city" type="text" label="City"
                        placeholder="Enter City" />
                    <FormInput v-model="customer.data.address" name="address" type="text" label="Address"
                        placeholder="Enter Address" />
                    <FormInput v-model="customer.data.postaleCode" name="postaleCode" type="text" label="Postale Code"
                        placeholder="Enter Postale Code" />
                </div>
                <button type="submit"
                    class="p-2 w-full bg-blue-200 hover:bg-blue-100 font-bold rounded mt-2.5">Enregistrer</button>
            </form>
        </div>
    </div>
</template>