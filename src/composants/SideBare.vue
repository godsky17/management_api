<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="col-span-1 min-h-[100vh] bg-white shadow-2xl fixed w-[20%] z-10">
    <h1 class="font-bold text-2xl p-5">Manager.</h1>

    <div class="mt-5">
      <ul class="">
        <RouterLink to="/" class="p-2 px-5 cursor-pointer hover:bg-blue-200 flex gap-4">
          <img
            class="w-[20px]"
            src="https://img.icons8.com/?size=100&id=86527&format=png&color=000000"
            alt=""
            srcset=""
          />
          Dashboard
        </RouterLink>
        <RouterLink to="/customers" class="p-2 px-5 cursor-pointer hover:bg-blue-200 flex gap-4">
          <img
            class="w-[20px]"
            src="https://img.icons8.com/?size=100&id=102261&format=png&color=000000"
            alt=""
            srcset=""
          />
          Customers
        </RouterLink>
      </ul>
    </div>
  </div>
</template>
