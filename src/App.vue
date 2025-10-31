<script setup>
import NavBar from './composants/navBar.vue'
import SideBare from './composants/sideBare.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-3 bg-gray-50">
    <!-- sidebar -->
    <SideBare />
    <div class="col-span-4 ml-[22%] w-[78%]">
      <!-- navbar -->
      <NavBar />
      <!-- main -->
      <div class="py-8">
        <RouterView class="mt-[58px]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.align-center {
  align-items: center;
}
</style>
