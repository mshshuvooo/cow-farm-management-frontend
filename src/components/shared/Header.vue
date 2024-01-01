<script setup>
import { useAuthStore } from "../../stores/auth.store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const auth = useAuthStore();
</script>

<template>
  <div
    class="grid grid-cols-2 items-center items-center bg-white px-10 py-3 shadow-md"
  >
    <div></div>
    <div class="text-end flex items-center justify-end">
      <div class="mr-5 text-2xl text-gray-500">
        <button @click="auth.logout()">
          <FontAwesomeIcon icon="fa-regular fa-share-from-square" />
        </button>
      </div>
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img
            class="w-[35px]"
            src="../../assets/images/user_icon.png"
            alt=""
          />
        </div>
        <div class="ml-2 text-left">
          <h3 class="text-sm font-semibold leading-4 mt-1 text-gray-900">
            {{ auth?.user?.name }}
          </h3>
          <p class="capitalize text-gray-600 text-sm">
            {{ auth?.user?.roles[0] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
