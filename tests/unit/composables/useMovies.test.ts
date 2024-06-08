import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useMovies } from "../../../src/composables/useMovies";
import { useApi } from "../../../src/composables/useApi";
import { Movie, MovieDetail } from "../../../src/types/movies.interface";
import { PaginatedResponse } from "../../../src/types/api.interface";

vi.mock("../../../src/composables/useApi", () => ({
  useApi: vi.fn(),
}));

describe("useMovies", () => {
  const mockGetList = vi.fn();
  const mockGetDetails = vi.fn();
  const mockError = ref<Error | null>(null);
  const mockLoading = ref(false);

  beforeEach(() => {
    vi.resetAllMocks();
    (useApi as any)
      .mockReturnValueOnce({
        get: mockGetList,
        error: mockError,
        loading: mockLoading,
      })
      .mockReturnValue({
        get: mockGetDetails,
        error: mockError,
        loading: mockLoading,
      });
  });

  it("fetches popular movies successfully", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      page: 1,
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-06-01",
          poster_path: "/path/to/image.jpg",
          vote_average: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    mockGetList.mockResolvedValueOnce(mockResponse);

    const { popularMovies, getPopularMovies } = useMovies();

    await getPopularMovies();

    expect(popularMovies.value).toEqual({
      ...mockResponse,
      results: [
        {
          ...mockResponse.results[0],
          release_date: new Date(Date.UTC(2023, 5, 1)).toLocaleDateString(
            "pt-BR"
          ),
          vote_average: 85,
        },
      ],
    });
    expect(mockError.value).toBeNull();
  });

  it("fetches movie details successfully", async () => {
    const mockResponse: MovieDetail = {
      id: 1,
      title: "Movie 1",
      release_date: "2023-06-01",
      genres: [{ id: 1, name: "Action" }],
      overview: "Overview",
      poster_path: "/path/to/image.jpg",
      popularity: 100,
      vote_average: 8.5,
      vote_count: 1000,
    };

    mockGetDetails.mockResolvedValueOnce(mockResponse);

    const { movieDetail, getMovieById } = useMovies();

    await getMovieById(1);

    expect(movieDetail.value).toEqual({
      ...mockResponse,
      release_date: new Date(Date.UTC(2023, 5, 1)).toLocaleDateString("pt-BR"),
      vote_average: 85,
    });
    expect(mockError.value).toBeNull();
  });

  it("fetches top rated movies successfully", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      page: 1,
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-06-01",
          poster_path: "/path/to/image.jpg",
          vote_average: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    mockGetList.mockResolvedValueOnce(mockResponse);

    const { topRatedMovies, getTopRatedMovies } = useMovies();

    await getTopRatedMovies();

    expect(topRatedMovies.value).toEqual({
      ...mockResponse,
      results: [
        {
          ...mockResponse.results[0],
          release_date: new Date(Date.UTC(2023, 5, 1)).toLocaleDateString(
            "pt-BR"
          ),
          vote_average: 85,
        },
      ],
    });
    expect(mockError.value).toBeNull();
  });

  it("fetches upcoming movies successfully", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      page: 1,
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-06-01",
          poster_path: "/path/to/image.jpg",
          vote_average: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    mockGetList.mockResolvedValueOnce(mockResponse);

    const { upcomingMovies, getUpcomingMovies } = useMovies();

    await getUpcomingMovies();

    expect(upcomingMovies.value).toEqual({
      ...mockResponse,
      results: [
        {
          ...mockResponse.results[0],
          release_date: new Date(Date.UTC(2023, 5, 1)).toLocaleDateString(
            "pt-BR"
          ),
          vote_average: 85,
        },
      ],
    });
    expect(mockError.value).toBeNull();
  });

  it("fetches now playing movies successfully", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      page: 1,
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-06-01",
          poster_path: "/path/to/image.jpg",
          vote_average: 8.5,
        },
      ],
      total_pages: 1,
      total_results: 1,
    };

    mockGetList.mockResolvedValueOnce(mockResponse);

    const { nowPlayingMovies, getNowPlayingMovies } = useMovies();

    await getNowPlayingMovies();

    expect(nowPlayingMovies.value).toEqual({
      ...mockResponse,
      results: [
        {
          ...mockResponse.results[0],
          release_date: new Date(Date.UTC(2023, 5, 1)).toLocaleDateString(
            "pt-BR"
          ),
          vote_average: 85,
        },
      ],
    });
    expect(mockError.value).toBeNull();
  });

  it("handles error while fetching movie details", async () => {
    mockGetDetails.mockResolvedValueOnce(null);
    mockError.value = new Error("Failed to fetch");

    const { movieDetail, error, getMovieById } = useMovies();

    await getMovieById(1);

    expect(movieDetail.value).toBeNull();
    expect(error.value).toEqual(new Error("Failed to fetch"));
  });
});
