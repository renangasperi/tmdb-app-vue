import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSearchMovie } from "../../../src/composables/useSearchMovie";
import { useApi } from "../../../src/composables/useApi";
import { Movie } from "../../../src/types/movies.interface";
import { PaginatedResponse } from "../../../src/types/api.interface";

vi.mock("../../../src/composables/useApi", () => ({
  useApi: vi.fn(),
}));

describe("useSearchMovie", () => {
  const mockGet = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useApi as any).mockReturnValue({
      get: mockGet,
    });
  });

  it("searches for movies successfully", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-06-01",
          poster_path: "/poster.jpg",
          vote_average: 8.5,
        },
      ],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    mockGet.mockResolvedValueOnce(mockResponse);

    const { searchList, searchMovie } = useSearchMovie();

    await searchMovie("test query");

    expect(searchList.value).toEqual(mockResponse);
  });

  it("handles empty search results", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    };

    mockGet.mockResolvedValueOnce(mockResponse);

    const { searchList, searchMovie } = useSearchMovie();

    await searchMovie("test query");

    expect(searchList.value).toEqual(mockResponse);
  });

  it("clears the search list", () => {
    const { searchList, clearSearchList } = useSearchMovie();

    searchList.value = {
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2023-06-01",
          poster_path: "/poster.jpg",
          vote_average: 8.5,
        },
      ],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    clearSearchList();

    expect(searchList.value).toBeNull();
  });
});
