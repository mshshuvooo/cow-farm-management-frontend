<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineProps({
  pages: Array,
});
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ul role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <router-link to="/" class="text-blue-600 hover:text-blue-700">
            <FontAwesomeIcon icon="fa-solid fa-house-chimney" />
            <span class="sr-only">Home</span>
          </router-link>
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <FontAwesomeIcon class="text-sm" icon="fa-solid fa-chevron-right" />
          <router-link
            :to="page.href"
            class="ml-4 text-md font-medium text-gray-900 transition-all ease-in-out delay-100 duration-300 hover:text-blue-600"
          >
            {{ page.name }}
          </router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>
