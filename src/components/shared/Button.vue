<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  label: String,
  to: {
    type: String,
    default: null
  },
});
</script>

<template>
  <button
    v-if="to == null"
    class="px-6 py-3 rounded font-medium uppercase transition-all ease-in-out delay-100 duration-300 bg-blue-600 text-white hover:bg-rose-600"
  >
    {{ label }}
  </button>
  <router-link
    v-if="to != null"
    :to="to"
    class="px-6 py-3 inline-block rounded font-medium uppercase transition-all ease-in-out delay-100 duration-300 bg-blue-600 text-white hover:bg-rose-600"
  >
    {{ label }}
  </router-link>
</template>
