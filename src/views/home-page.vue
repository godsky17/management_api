<script setup lang="ts">
import CardStat from '@/composants/card-stat.vue'
</script>

<template>
  <div class="bg-white p-5 rounded-xl shadow-2xl mr-[2%]">
    <div class="grid grid-cols-3 gap-2 cursor-pointer">
      <CardStat title="Total Customer" stats="54" desc="From this year" />
      <CardStat title="Total Invoices" stats="4" desc="From this year" />
      <CardStat title="Flux" stats="14" desc="From this day" />
    </div>
  </div>
</template>
