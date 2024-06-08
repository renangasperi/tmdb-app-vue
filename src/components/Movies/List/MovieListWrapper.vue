<template>
  <div class="flex justify-between mb-2">
    <h3 class="text-2xl text-blue-dark">{{ title }}</h3>

    <button
      class="px-3 rounded-md text-md text-blue-dark font-bold hover:bg-slate-300 transition-colors"
      @click="$router.push(`/movies/${path}`)"
    >
      Ver todos
    </button>
  </div>

  <ScrollableList v-if="!!movies">
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    <div
      class="h-56 w-36 px-4 text-center flex items-center justify-center rounded-md cursor-pointer text-blue-dark font-bold hover:bg-slate-300 transition-colors"
      @click="$router.push(`/movies/${path}`)"
    >
      Ir para a categoria
    </div>
  </ScrollableList>
</template>

<script setup lang="ts">
import { Movie } from "../../../types/movies.interface";
import ScrollableList from "../../common/ScrollableList.vue";
import MovieCard from "./MovieCard.vue";

defineProps<{
  title: string;
  movies: Movie[] | null;
  path: string;
}>();
</script>
