import { ref } from "vue";
import { useApi } from "./useApi";
import { Movie, MovieDetail } from "../types/movies.interface";
import { PaginatedResponse } from "../types/api.interface";

export function useMovies() {
  const { get: getList, error, loading } = useApi<PaginatedResponse<Movie>>();
  const { get: getDetails } = useApi<MovieDetail>();

  const path = "movie";

  const movieDetail = ref<MovieDetail | null>(null);
  const popularMovies = ref<PaginatedResponse<Movie> | null>(null);
  const topRatedMovies = ref<PaginatedResponse<Movie> | null>(null);
  const upcomingMovies = ref<PaginatedResponse<Movie> | null>(null);
  const nowPlayingMovies = ref<PaginatedResponse<Movie> | null>(null);

  const formatListResponse = (response: PaginatedResponse<Movie> | null) => {
    if (!response) {
      return null;
    }

    return {
      ...response,
      results: response.results.map((movie) => ({
        ...movie,
        release_date: new Date(movie.release_date).toLocaleDateString("pt-BR"),
        vote_average: +movie.vote_average.toFixed(1) * 10,
      })),
    };
  };

  const getMovieById = async (id: number): Promise<void> => {
    const response = await getDetails(`${path}/${id}`);

    if (!response) return;

    movieDetail.value = {
      ...response,
      release_date: new Date(response.release_date).toLocaleDateString("pt-BR"),
      vote_average: +response.vote_average.toFixed(1) * 10,
    };
  };

  const getPopularMovies = async (page: number = 1): Promise<void> => {
    const response = await getList(`${path}/popular`, {
      page: page.toString(),
    });

    const data = formatListResponse(response);

    if (page > 1 && !!data) {
      popularMovies.value = {
        ...data,
        results: [...popularMovies.value!.results, ...data.results],
      };
      return;
    }
    popularMovies.value = data;
  };

  const getTopRatedMovies = async (page: number = 1): Promise<void> => {
    const response = await getList(`${path}/top_rated`, {
      page: page.toString(),
    });

    const data = formatListResponse(response);

    if (page > 1 && !!data) {
      topRatedMovies.value = {
        ...data,
        results: [...topRatedMovies.value!.results, ...data.results],
      };
      return;
    }
    topRatedMovies.value = data;
  };

  const getUpcomingMovies = async (page: number = 1): Promise<void> => {
    const response = await getList(`${path}/upcoming`, {
      page: page.toString(),
    });

    const data = formatListResponse(response);

    if (page > 1 && !!data) {
      upcomingMovies.value = {
        ...data,
        results: [...upcomingMovies.value!.results, ...data.results],
      };
      return;
    }
    upcomingMovies.value = data;
  };

  const getNowPlayingMovies = async (page: number = 1): Promise<void> => {
    const response = await getList(`${path}/now_playing`, {
      page: page.toString(),
    });

    const data = formatListResponse(response);

    if (page > 1 && !!data) {
      nowPlayingMovies.value = {
        ...data,
        results: [...nowPlayingMovies.value!.results, ...data.results],
      };
      return;
    }
    nowPlayingMovies.value = data;
  };

  return {
    movieDetail,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    error,
    loading,
    getMovieById,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
  };
}
