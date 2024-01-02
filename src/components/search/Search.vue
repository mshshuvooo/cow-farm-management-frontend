<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const props = defineProps({
  search: String,
});

defineEmits(["update:search"]);
</script>
<template>
  <div class="relative mb-3">
    <div
      class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
    >
      <FontAwesomeIcon
        class="text-gray-400"
        icon="fa-solid fa-magnifying-glass"
      />
    </div>
    <input
      type="text"
      class="block w-full rounded-md px-5 py-3 bg-gray-50 border border-gray-200 focus:border-gray-300 focus:outline-0 sm:text-md p-2"
      placeholder="Search..."
      :value="props.search"
      @input="$emit('update:search', $event.target.value)"
    />
  </div>
</template>

<style></style>
