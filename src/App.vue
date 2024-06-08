<template>
  <div id="app" class="bg-slate-200">
    <Header />
    <div
      class="container mx-auto mt-16 py-4 max-w-6xl px-3 xl:px-0 min-h-screen"
    >
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/common/Header.vue";
</script>
