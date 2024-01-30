<script setup>
import CowList from "/src/components/cow/CowList.vue";
defineProps({
    cow: Object
})
</script>

<template>
    <div class="bg-white rounded-md mt-5">
      <div class="px-4 pt-6">
        <h3 class="text-xl font-semibold leading-7 text-gray-900">Children</h3>
        <p class="mt-1 text-md leading-6 text-gray-500">
          List of children of {{ cow?.name }}
        </p>
      </div>
      <div class="p-4 mt-2">
        <CowList view="simple" :cows="cow?.children" />
      </div>
    </div>
</template>