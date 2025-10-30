<template>
  <div class="bg-blue-200 p-5 rounded-xl">
    <p class="font-bold">{{ title }}</p>
    <h2 class="font-bold text-7xl mt-3">{{ stats }}</h2>
    <p class="italic">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },

  stats: {
    type: String,
  },

  desc: {
    type: String,
  },
})
</script>
