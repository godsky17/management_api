<template>
  <div class="flex flex-col flex-1 bg-stone-200 rounded-xl p-1.5 px-5 cursor-text">
    <label :for="name" class="text-[10px] cursor-text w-full">{{ label }}</label>
    <input
      class="outline-0 bg-transparent"
      :type="inputType"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
    default: 'name',
  },
  label: {
    type: String,
    required: true,
    default: 'Label',
  },
  inputType: {
    type: String,
    required: true,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
  },
})
</script>
