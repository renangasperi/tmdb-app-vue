<template>
  <div class="select-none w-36 cursor-pointer">
    <img
      v-if="!!castMember.profile_path"
      :src="`https://image.tmdb.org/t/p/w200${castMember.profile_path}`"
      :alt="castMember.name"
      class="w-full h-56 object-cover rounded-lg shadow-md"
      loading="lazy"
    />
    <div
      v-else
      class="w-full h-56 bg-gray-300 flex items-center justify-center rounded-lg shadow-md text-4xl font-bold text-gray-500"
    >
      ?
    </div>
    <div class="p-2 mt-1">
      <h4 class="text-md font-semibold text-wrap">
        {{ castMember.name }}
      </h4>
      <p class="text-gray-600">{{ castMember.character }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CastMember } from "../../../types/credits.interface";

defineProps<{
  castMember: CastMember;
}>();
</script>
