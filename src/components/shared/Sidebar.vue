<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useAuthStore } from "../../stores/auth.store";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import NavigationLink from "./NavigationLink.vue";
import NavigationHeader from "./NavigationHeader.vue";

const auth = useAuthStore();
console.log(auth.user);
const navigation = [
  {
    name: "Dashboard",
    header: false,
    href: "/",
    icon: "fa-solid fa-bars",
  },
  {
    name: "Cows",
    header: false,
    href: "/cows",
    icon: "fa-solid fa-cow",
    required_role: ["admin"],
  },

  // {
  //   name: "Sage Sync",
  //   header: true,
  // },
];

const sidebarOpen = ref(false);
</script>
<template>
  <div
    class="flex py-2 justify-between md:px-[20px] px-[20px] flex-shrink-0 border-b border-gray-200 bg-white lg:border-none lg:hidden"
  >
    <button
      type="button"
      class="border-r border-gray-200 pr-4 text-gray-400 focus:outline-none"
      @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <FontAwesomeIcon class="text-2xl" icon="fa-solid fa-bars" />
    </button>
    <button
      v-if="auth.user !== null"
      @click="auth.logout()"
      class="inline-block bg-gray-900 py-3 px-7 border border-transparent rounded-md uppercase text-base font-medium text-white transition-all ease-in-out delay-100 hover:bg-darkKhaki hover:text-gray-900"
    >
      Log Out
    </button>
  </div>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="relative z-40 lg:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 pb-4 pt-5"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute right-0 top-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <FontAwesomeIcon
                    class="text-2xl text-white"
                    icon="fa-solid fa-xmark"
                  />
                </button>
              </div>
            </TransitionChild>
            <div class="items-center px-4 mb-5">
              <h1 class="text-white font-bold text-2xl uppercase mb-1">
                Nirapod Agro
              </h1>
              <p class="text-white">Cow Management System</p>
            </div>
            <nav
              class="flex flex-1 flex-col justify-between mt-5 h-full flex-shrink-0 divide-y divide-gray-700 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div class="space-y-1 px-2">
                <div v-for="item in navigation" :key="item.name">
                  <NavigationLink
                    @click="sidebarOpen = false"
                    v-if="item.header === false && item.href !== null"
                    :item="item"
                  />
                  <NavigationHeader v-else :item="item" />
                </div>
              </div>
            </nav>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[300px] lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex flex-grow flex-col overflow-y-auto bg-gray-900 pb-4 pt-[30px]"
    >
      <div class="items-center px-4 mb-5">
        <h1 class="text-white font-extrabold text-2xl uppercase mb-1">
          Nirapod Agro
        </h1>
        <p class="text-white">Cow Farm Management System</p>
      </div>
      <nav
        class="mt-5 mb-[50px] justify-between flex flex-1 flex-col divide-y divide-gray-700 overflow-y-auto"
        aria-label="Sidebar"
      >
        <div class="space-y-1 px-2">
          <div v-for="item in navigation" :key="item.name">
            <NavigationLink
              v-if="item.header === false && item.href !== null"
              :item="item"
            />
            <NavigationHeader v-else :item="item" />
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
