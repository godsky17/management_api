<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import FormInput from '@/composants/forms/FormInput.vue';
import { customerService } from '@/services/customer.service';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
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
    error: storeCustomerError,
    laoding: storeCustomerLaoding,
    execute: storeCustomer,
} = useApi(customerService.storeCustomer)
const router = useRouter()


function traitment() {
    // Tchecking of Data from form
    if (!dataForms.value.name || !dataForms.value.email || !dataForms.value.type || !dataForms.value.state || !dataForms.value.city || !dataForms.value.address || !dataForms.value.postaleCode) {
        error.value.show = true
        error.value.message = "Veuillez remplir convenablement tout les champs !"
    } else if (!['I', 'i', 'B', 'b'].includes(dataForms.value.type)) {
        error.value.show = true
        error.value.message = "Donnees invalide !"
    }

    // Call and Save data
    try {
        storeCustomer(dataForms.value)
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

</script>

<template>
    <div class="bg-white p-5 shadow-2xl rounded-xl mr-[2%]">
        <h1 class="font-bold text-2xl mb-5">Customer details</h1>

        <div v-if="error.show" class="p-5 bg-red-400 text-white text-center rounded-xl mb-2.5">
            {{ error.message }}
        </div>
        <form @submit.prevent="traitment">
            <div class="grid grid-cols-2 gap-2 mb-2">
                <FormInput v-model="dataForms.name" name="name" type="text" label="Name" placeholder="Enter name" />
                <FormInput v-model="dataForms.email" name="email" type="text" label="email" placeholder="Enter email" />
            </div>
            <div class="grid grid-cols-2 gap-2 mb-2">
                <div class="flex flex-col flex-1 bg-stone-200 rounded-xl p-1.5 px-5 cursor-text">
                    <label for="type" class="text-[10px] cursor-text w-full">Type</label>
                    <select v-model="dataForms.type" name="type" id="type">
                        <option disabled value="">-- Choisir un type --</option>
                        <option value="I">Individual</option>
                        <option value="B">Business</option>
                        <option value="e">Mauvais</option>
                    </select>
                </div>
                <FormInput v-model="dataForms.state" name="state" type="text" label="State" placeholder="Enter State" />
            </div>
            <div class="grid grid-cols-3 gap-2 mb-2">
                <FormInput v-model="dataForms.city" name="city" type="text" label="City" placeholder="Enter City" />
                <FormInput v-model="dataForms.address" name="address" type="text" label="Address"
                    placeholder="Enter Address" />
                <FormInput v-model="dataForms.postaleCode" name="postaleCode" type="text" label="Postale Code"
                    placeholder="Enter Postale Code" />
            </div>
            <button type="submit"
                class="p-2 w-full bg-blue-200 hover:bg-blue-100 font-bold rounded mt-2.5">Enregistrer</button>
        </form>
    </div>
</template>