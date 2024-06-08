<template>
  <BaseLoading v-if="!!loading" />

  <div v-else>
    <MovieListWrapper
      title="Em Cartaz"
      path="now-playing"
      :movies="nowPlayingMovies?.results || null"
    />
    <MovieListWrapper
      title="Melhor Classificação"
      path="top-rated"
      :movies="topRatedMovies?.results || null"
    />
    <MovieListWrapper
      title="Os Mais Populares"
      path="popular"
      :movies="popularMovies?.results || null"
    />
    <MovieListWrapper
      title="Filmes que estão por vir"
      path="upcoming"
      :movies="upcomingMovies?.results || null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovies } from "../../composables/useMovies";
import MovieListWrapper from "../../components/Movies/List/MovieListWrapper.vue";
import BaseLoading from "../../components/common/BaseLoading.vue";

const {
  loading,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} = useMovies();

onMounted(() => {
  getPopularMovies();
  getTopRatedMovies();
  getUpcomingMovies();
  getNowPlayingMovies();
});
</script>
