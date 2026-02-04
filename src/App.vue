<template>
  <div class="min-h-screen bg-[#FEFEFE] text-[#585858] flex flex-col">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
</script>
