<template>
  <h3 class="text-2xl text-blue-dark mb-3">Os Filmes Mais Populares</h3>

  <BaseLoading v-if="!!loading" />

  <div v-if="!!popularMovies">
    <div class="flex flex-wrap gap-4 justify-center">
      <MoviesCard
        v-for="movie in popularMovies.results"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div class="flex justify-center">
      <button
        v-if="popularMovies.page < popularMovies.total_pages"
        class="w-80 mt-4 bg-blue-dark text-white px-4 py-2 rounded-md shadow-md hover:brightness-150 transition-colors disabled:bg-slate-500"
        @click="loadMoreMovies"
        :disabled="loading"
      >
        Ver mais
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovies } from "../../composables/useMovies";
import MoviesCard from "../../components/Movies/List/MovieCard.vue";
import BaseLoading from "../../components/common/BaseLoading.vue";

const { popularMovies, getPopularMovies, loading } = useMovies();

const loadMoreMovies = () => {
  if (!popularMovies.value) return;
  getPopularMovies(popularMovies.value.page + 1);
};

onMounted(() => {
  getPopularMovies();
});
</script>
