<template>
  <div class="font-bold px-2 rounded-md" :class="getVoteColor(voteAverage)">
    {{ voteAverage }}%
  </div>
</template>

<script setup lang="ts">
defineProps<{
  voteAverage: number;
}>();

const getVoteColor = (voteAverage: number) => {
  if (voteAverage >= 70) return "bg-green-500";

  if (voteAverage >= 50) return "bg-yellow-500";

  return "bg-red-500";
};
</script>
