<template>
  <div v-if="loadingUser" class="text-center p-4">Chargement des utilisateurs...</div>

  <!-- Affichage des erreurs -->
  <div v-else-if="userError" class="text-red-500 p-4">Erreur : {{ userError }}</div>
  <div v-else>
    <form @submit.prevent="getData">
      <div class="grid grid-cols-2 gap-2 py-2">
        <FormInput
          label="Last Name"
          name="last_name"
          placeholder="Last Name"
          v-model="formUser.last_name"
        />

        <FormInput
          label="First Name"
          name="first_name"
          placeholder="First Name"
          v-model="formUser.first_name"
        />
      </div>

      <div class="py-2">
        <FormInput label="Email" name="email" placeholder="Email" v-model="formUser.email" />
      </div>

      <div>
        <button class="w-full bg-blue-200 py-3 mt-4 hover:bg-blue-300 text-bold">Valider</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { userService } from '@/services/user.service'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import FormInput from '@/composants/forms/FormInput.vue'

const route = useRoute()
const userId = route.params.id
const {
  data: user,
  laoding: loadingUser,
  error: userError,
  execute: fetchUser,
} = useApi(userService.getUserById)

const {
  laoding: laodingUpdateUser,
  error: updateError,
  execute: updateUser,
} = useApi(userService.updateUser)

const formUser = reactive({
  first_name: '',
  last_name: '',
  email: '',
})

async function getData() {
  if (!formUser.email || !formUser.last_name || !formUser.first_name) {
    alert('Remplissez convenablement tout les champs.')
    return
  }

  const response = await updateUser(userId, formUser)
  if (response && !updateError.value) {
    console.log('Utilisateur mis à jour avec succès')
  }
}

onMounted(async () => {
  try {
    await fetchUser([userId])
    formUser.email = user.value?.data.email
    formUser.last_name = user.value.data.last_name
    formUser.first_name = user.value.data.first_name
    //Object.assign(formUser, user.value.data)
    console.log(formUser)
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
  }
})
</script>
