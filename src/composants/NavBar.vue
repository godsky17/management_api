<script setup>
import { ref } from 'vue'
import profileImg from '../assets/img/profile-img.png'

const is_show = ref(false)

function openModal() {
  is_show.value = !is_show.value
}
</script>

<template>
  <div class="flex bg-white justify-end p-2 shadow-xl fixed w-3xl right-0 w-[80%]">
    <ul>
      <li
        class="flex gap-2 justify-center align-middle align-center cursor-pointer"
        @click="openModal"
      >
        <img class="rounded-full w-[50px]" :src="profileImg" alt="" srcset="" />
        <p class="font-bold">Gauthe Christian</p>
      </li>
    </ul>
    <!-- modal -->
    <div v-if="is_show" class="absolute bg-blue-200 mt-15 py-4 w-60">
      <ul class="">
        <li class="hover:bg-white p-2 cursor-pointer">Profile</li>
        <li class="hover:bg-white p-2 cursor-pointer">Deconexion</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.align-center {
  align-items: center;
}

.style {
  width: 250px;
}
</style>
