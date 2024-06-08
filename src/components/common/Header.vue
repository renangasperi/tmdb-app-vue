<template>
  <header class="w-full relative z-50">
    <div
      class="fixed top-0 left-0 pt-3 pb-4 bg-blue-dark w-full"
      :class="{ 'animate-slide-up': slide }"
    >
      <div
        class="container flex justify-between mx-auto max-w-6xl px-2 sm:px-8"
      >
        <span
          class="text-3xl font-bold text-blue-light cursor-pointer"
          @click="$router.push('/')"
          >TMDB</span
        >
        <i
          class="text-blue-light w-9 p-1 rounded-full cursor-pointer hover:bg-sky-950 user-select-none"
          @click="showSearch = !showSearch"
        >
          <img
            v-if="!showSearch"
            src="@/assets/search-icon.svg"
            alt="search icon"
          />
          <img v-else src="@/assets/close-icon.svg" alt="close icon" />
        </i>
      </div>
    </div>

    <SearchBar
      v-if="showSearch"
      :slide="slide"
      @closeSearch="showSearch = !showSearch"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchBar from "./SearchBar.vue";

const slide = ref(false);
const showSearch = ref(false);

const handleScroll = () => {
  if (window.scrollY > 64) {
    slide.value = true;
  } else {
    slide.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@keyframes slide-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s forwards;
}
</style>
