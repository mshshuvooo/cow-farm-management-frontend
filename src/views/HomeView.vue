<script setup>
import { useAuthStore } from '../stores/auth.store';

const auth = useAuthStore();

  console.log(auth.user);
</script>

<template>
    <h1>Home</h1>
    <h1>{{ auth?.user?.name }}</h1>
</template>
