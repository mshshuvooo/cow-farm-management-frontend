<script setup>
const props = defineProps({
  errors: Array,
});
</script>

<template>
  <div
    v-for="(error, index) in props.errors"
    :key="index"
    class="bg-rose-100 px-4 py-2 mt-2 border-l-[3px] border-rose-700"
  >
    <p class="ml-[-3px]">{{ error }}</p>
  </div>
</template>
