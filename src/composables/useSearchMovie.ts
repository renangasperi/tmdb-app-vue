import { ref } from "vue";
import { useApi } from "./useApi";
import { Movie } from "../types/movies.interface";

interface ApiResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export function useSearchMovie() {
  const { get } = useApi<ApiResponse<Movie>>();
  const path = "search/movie";

  const searchList = ref<ApiResponse<Movie> | null>(null);

  const searchMovie = async (query: string): Promise<void> => {
    const response = await get(path, { query });

    searchList.value = response;
  };

  const clearSearchList = () => {
    searchList.value = null;
  };

  return {
    searchList,
    searchMovie,
    clearSearchList,
  };
}
