<template>
  <BaseLoading v-if="!movieDetail || !movieCredits" />

  <div v-else>
    <div
      v-if="movieDetail"
      class="flex gap-4 flex-wrap md:flex-nowrap justify-center"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`"
        :alt="`poster de ${movieDetail.title}`"
        class="w-max h-max rounded-lg shadow-md shrink-0 grow-0"
        loading="lazy"
      />

      <div class="flex flex-col gap-2">
        <h3 class="text-3xl font-bold">{{ movieDetail.title }}</h3>

        <div class="w-max flex gap-4">
          <VoteBadge :voteAverage="movieDetail.vote_average" />

          <span class="text-lg">{{ movieDetail.vote_count }} votos</span>
        </div>

        <span class="text-md">
          Data de lançamento: {{ movieDetail.release_date }}
        </span>

        <div class="flex gap-2 flex-wrap">
          <div
            v-for="genre in movieDetail?.genres"
            :key="genre.id"
            class="font-bold rounded-md text-white bg-gray-800 px-2 py-1"
          >
            {{ genre.name }}
          </div>
        </div>

        <span class="text-xl font-bold mt-4">Sinopse</span>
        <p class="text-md">{{ movieDetail.overview }}</p>
      </div>
    </div>

    <BaseLoading v-if="!movieCredits" />

    <div v-if="movieCredits" class="mt-3">
      <h3 class="text-xl font-bold mb-2">Elenco Principal</h3>

      <ScrollableList>
        <CastCard
          v-for="castMember in movieCredits?.cast"
          :key="castMember.cast_id"
          :castMember="castMember"
        />
      </ScrollableList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useMovies } from "../../composables/useMovies";
import { useMovieCredits } from "../../composables/useMovieCredits";
import VoteBadge from "../../components/common/VoteBadge.vue";
import ScrollableList from "../../components/common/ScrollableList.vue";
import CastCard from "../../components/Movies/List/CastCard.vue";
import BaseLoading from "../../components/common/BaseLoading.vue";

const { movieDetail, getMovieById } = useMovies();
const { movieCredits, getMovieCredits } = useMovieCredits();

const router = useRouter();

watch(
  () => router.currentRoute.value.params.id,
  async (newId) => {
    movieDetail.value = null;
    getMovieById(+newId);
    getMovieCredits(+newId);
  }
);

onMounted(() => {
  const { id: movieId } = router.currentRoute.value.params;

  getMovieById(+movieId);
  getMovieCredits(+movieId);
});
</script>
