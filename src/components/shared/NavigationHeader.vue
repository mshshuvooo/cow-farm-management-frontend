<script setup>
import { computed } from "vue";
import { useAuthStore } from "../../stores/auth.store";

const authStore = useAuthStore();

const props = defineProps({
  item: Object,
});

// const canView = computed(() => {
//   if (props?.item?.required_permissions == undefined) return true;
//   const userPermissions = authStore.user.permissions;
//   let permitted = false;
//   props.item.required_permissions.forEach((permission) => {
//     if (userPermissions.includes(permission)) {
//       permitted = true;
//     }
//   });

//   return permitted;
// });
</script>

<template>
  <h2 class="text-yellow-400 mt-5 mb-2 font-bold">{{ props?.item?.name }}</h2>
</template>

<style scoped>
/* h2 {
  color: #c1b562;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
} */
</style>