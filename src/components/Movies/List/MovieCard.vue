<template>
  <div
    class="select-none w-36 cursor-pointer"
    @click="$router.push(`/movies/${movie.id}`)"
  >
    <img
      :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
      :alt="`poster de ${movie.title}`"
      class="w-full h-56 object-cover rounded-lg shadow-md"
      loading="lazy"
    />
    <div class="p-2 mt-1 relative">
      <div class="absolute right-1 -top-4">
        <VoteBadge :vote-average="movie.vote_average" />
      </div>
      <h4 class="text-md font-semibold text-wrap">
        {{ movie.title }}
      </h4>
      <p class="text-gray-500">{{ movie.release_date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from "../../../types/movies.interface";
import VoteBadge from "../../common/VoteBadge.vue";

defineProps<{
  movie: Movie;
}>();
</script>
