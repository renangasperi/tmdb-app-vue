import { ref } from "vue";
import { useApi } from "./useApi";
import { CreditsResponse } from "../types/credits.interface";

export function useMovieCredits() {
  const { get, error, loading } = useApi<CreditsResponse>();
  const movieCredits = ref<CreditsResponse | null>(null);

  const getMovieCredits = async (movieId: number): Promise<void> => {
    loading.value = true;

    movieCredits.value = await get(`movie/${movieId}/credits`);

    loading.value = false;
  };

  return {
    movieCredits,
    error,
    loading,
    getMovieCredits,
  };
}
