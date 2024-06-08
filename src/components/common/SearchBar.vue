<template>
  <div
    class="fixed max-h-96 p-2 bg-slate-100 w-full border-b border-gray-200 shadow-md overflow-y-auto"
    :class="{ 'animate-slide-up': slide }"
  >
    <div class="relative max-w-6xl mx-auto">
      <i class="absolute text-blue-light w-8 p-1 rounded-full">
        <img src="@/assets/search-icon.svg" alt="search icon" />
      </i>

      <input
        class="w-full px-2 py-1 pl-10 text-blue-dark outline-none bg-slate-100 focus:bg-slate-200 rounded-md"
        placeholder="Busque por filmes"
        v-model="inputValue"
        @input="onInput"
      />
    </div>

    <ul v-if="!!searchList" class="mt-2">
      <li
        v-for="(movie, index) in searchList?.results"
        :key="movie.id"
        :class="{
          'border-b': index != searchList.results.length - 1,
          'border-t': index === 0,
        }"
        class="py-1 cursor-pointer hover:bg-slate-200"
        @click="() => handleMovieClick(movie.id)"
      >
        <p class="max-w-6xl mx-auto">{{ movie.title }}</p>
      </li>
      <li v-if="!searchList?.results.length" class="py-1 border-t">
        <p class="max-w-6xl mx-auto">Sem resultados</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDebounce } from "../../composables/useDebounce";
import { useSearchMovie } from "../../composables/useSearchMovie";
import { useRouter } from "vue-router";

const props = defineProps<{
  slide: boolean;
}>();

const emits = defineEmits(["closeSearch"]);

const inputValue = ref("");
const { clearSearchList, searchList, searchMovie } = useSearchMovie();
const { debouncedValue, updateValue } = useDebounce(inputValue.value);

const router = useRouter();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  updateValue(target.value);
};

const handleMovieClick = (movieId: number) => {
  clearSearchList();
  emits("closeSearch");

  router.push({
    name: "MovieDetails",
    path: `/movie/${movieId}`,
    params: { id: movieId.toString() },
  });
};

watch(
  () => props.slide,
  (newValue) => {
    if (!!newValue) {
      inputValue.value = "";
      clearSearchList();
    }
  }
);

watch(debouncedValue, (newValue: string) => {
  if (!newValue) {
    clearSearchList();
    return;
  }

  searchMovie(newValue);
});
</script>

<style scoped>
@keyframes slide-up {
  0% {
    margin-top: translateY(0);
  }
  100% {
    transform: translateY(-64px);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s forwards;
}
</style>
