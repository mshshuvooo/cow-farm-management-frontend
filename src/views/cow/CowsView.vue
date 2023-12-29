<script setup>
import Breadcrumb from "../../components/shared/Breadcrumb.vue";
import Button from "../../components/shared/Button.vue";

const breadcrumbPages = [{ name: "Cows", href: "/cows", current: true }];
</script>

<template>
  <div class="grid grid-cols-2 items-center">
    <div>
      <h1 class="text-2xl font-bold mb-2">Cows</h1>
      <Breadcrumb :pages="breadcrumbPages" />
    </div>
    <div class="text-end">
      <Button to="/" label="Add New Cow" />
    </div>
  </div>
</template>
