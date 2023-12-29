<script setup>
defineProps({
  label: String,
  to: String,
});
</script>

<template>
  <button
    :to="to"
    class="px-6 py-3 rounded font-semibold uppercase transition-all ease-in-out delay-100 duration-300 bg-blue-600 text-white hover:bg-rose-600"
  >
    {{ label }}
  </button>
</template>
