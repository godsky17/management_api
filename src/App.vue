<script setup>
import NavBar from './composants/navBar.vue'
import SideBare from './composants/sideBare.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-3 m-2">
    <!-- sidebar -->
    <SideBare />
    <div class="col-span-3 mt-2">
      <!-- navbar -->
      <NavBar />
      <!-- main -->
      <div class="py-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.align-center {
  align-items: center;
}
</style>
