<script setup>
import { useAuthStore } from "../../stores/auth.store";
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  item: Object,
});

const auth = useAuthStore();

const canView = computed(() => {
  if (props.item.required_role == undefined) return true;

  const userRoles = auth?.user?.roles ?? [];

  let permitted = false;

  props.item.required_role.forEach((role) => {
    if (userRoles.includes(role)) {
      permitted = true;
    }
  });

  return permitted;
});
</script>

<template>
  <router-link
    v-show="canView"
    :to="props.item.href"
    class="text-white bg-blue-600 group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-md uppercase transition-all ease-in-out delay-100 duration-300 hover:bg-rose-600"
  >
    <div v-if="props?.item?.icon" class="pr-2">
      <FontAwesomeIcon class="text-lg pt-[3px]" :icon="props?.item?.icon" />
    </div>

    {{ props.item.name }}
  </router-link>
</template>

<style scoped>
.router-link-exact-active {
  background-color: #e11d48;
}
</style>
