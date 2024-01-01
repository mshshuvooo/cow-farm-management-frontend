<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/shared/Sidebar.vue";
import Header from "./components/shared/Header.vue";
import { useAuthStore } from "./stores/auth.store";

const auth = useAuthStore();
</script>
<template>
  <div class="min-h-full">
    <Sidebar />
    <div class="lg:pl-[300px]">
      <Header v-if="auth?.user" />
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
