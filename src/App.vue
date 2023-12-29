<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/shared/Sidebar.vue";
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();

</script>
<template>
  <div class="min-h-full">
    <Sidebar/>
    <div class="flex flex-1 flex-col lg:pl-[300px]">
      <main
        class="flex-1 lg:px-[80px] md:px-[20px] px-[20px] lg:pt-[50px] md:pt-[30px] pt-[30px] pb-[50px] bg-[#ecf0f2] min-h-screen"
      >
        <Suspense>
          <RouterView />
        </Suspense>
      </main>
    </div>
  </div>
</template>