<template>
  <div>
    <!-- Affichage du chargement -->
    <div v-if="loadingUsers" class="text-center p-4">Chargement des utilisateurs...</div>

    <!-- Affichage des erreurs -->
    <div v-else-if="usersError" class="text-red-500 p-4">Erreur : {{ usersError }}</div>

    <!-- Affichage du tableau -->
    <div v-else-if="users?.data">
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left px-2">Avatar</th>
            <th class="text-left px-2">Nom</th>
            <th class="text-left px-2">Email</th>
            <th class="text-left px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users.data" :key="user.id" class="p-5">
            <td class="text-left px-2">
              <img class="w-[50px] rounded-full" :src="user.avatar" alt="" />
            </td>
            <td class="text-left px-2">{{ user.last_name }} {{ user.first_name }}</td>
            <td class="text-left px-2">{{ user.email }}</td>
            <td class="text-left px-2">
              <RouterLink
                :to="`/users/${user.id}`"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Modifier
              </RouterLink>
              <button
                @click="handleDelete(user.id)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination (optionnel) -->
      <div class="mt-4 flex justify-between items-center px-2">
        <p>Page {{ users.page }} sur {{ users.total_pages }}</p>
        <div class="flex gap-5">
          <p
            v-if="current_page > 1"
            @click="prevPage"
            class="cursor-pointer border-1 px-3 py-1 hover:text-blue-200"
          >
            prev
          </p>
          <p>{{ users.page }}</p>
          <p
            v-if="current_page < users.total_pages"
            @click="nextPage"
            class="cursor-pointer border-1 px-3 py-1 hover:text-blue-200"
          >
            next
          </p>
        </div>

        <p>Total : {{ users.total }} utilisateurs</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { userService } from '@/services/user.service'
import { computed, handleError, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const {
  data: users,
  loading: loadingUsers,
  error: usersError,
  execute: fetchUsers,
} = useApi(userService.getUsers)

const {
  loading: deleteLaoding,
  error: deleteError,
  execute: deleteUser,
} = useApi(userService.deleteUser)

const current_page = computed(() => users.value?.page)

async function nextPage() {
  if (users.value.page < users.value.total_pages) {
    await fetchUsers({
      nextPage: users.value.page + 1,
    })
  }
}

async function prevPage() {
  if (users.value.page > 1) {
    await fetchUsers({
      nextPage: users.value.page - 1,
    })
  }
}

async function handleDelete(id) {
  if (!id) {
    alert('Aucun utilisateur')
    return
  }

  const response = await deleteUser(id)
  if (response) {
    alert('Supprimer')
  }
}

onMounted(async () => {
  try {
    await fetchUsers()
  } catch (err) {
    console.error('Erreur lors du chargement des utilisateurs:', err)
  }
})
</script>
