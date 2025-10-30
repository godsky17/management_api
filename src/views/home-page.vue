<script setup lang="ts">
import CardStat from '@/composants/card-stat.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-2 cursor-pointer">
    <CardStat title="Total Users" stats="54" desc="From this year" />
    <CardStat title="User Save" stats="4" desc="From this week" />
    <CardStat title="Actif" stats="14" desc="From this day" />
  </div>
</template>
