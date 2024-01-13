<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  apiResponse: Object,
});
const message = ref("");
const show = ref(false);

watch(
  () => props.apiResponse,
  () => {
    if (props.apiResponse?.data?.success) {
      message.value = props.apiResponse?.data?.message;
      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 5000);
    }
  }
);
</script>
<template>
  <div
    aria-live="assertive"
    class="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 pt-0.5">
                <FontAwesomeIcon
                  class="text-lg text-[#30a04a]"
                  icon="fa-solid fa-circle-check"
                />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-md font-medium text-gray-900">
                  {{ message }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="show = false"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span class="sr-only">Close</span>
                  <FontAwesomeIcon class="text-md" icon="fa-solid fa-xmark" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
