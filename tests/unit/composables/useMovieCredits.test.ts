import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useMovieCredits } from "../../../src/composables/useMovieCredits";
import { useApi } from "../../../src/composables/useApi";
import { CreditsResponse } from "../../../src/types/credits.interface";

vi.mock("../../../src/composables/useApi", () => ({
  useApi: vi.fn(),
}));

describe("useMovieCredits", () => {
  const mockGet = vi.fn();
  const mockError = ref<null | Error>(null);
  const mockLoading = ref(false);

  beforeEach(() => {
    vi.resetAllMocks();
    (useApi as any).mockReturnValue({
      get: mockGet,
      error: mockError,
      loading: mockLoading,
    });
  });

  it("fetches movie credits successfully without query params", async () => {
    const mockCredits: CreditsResponse = {
      id: 123,
      cast: [
        {
          cast_id: 1,
          name: "Actor",
          character: "Character",
          profile_path: "/path.jpg",
        },
      ],
    };

    mockGet.mockResolvedValueOnce(mockCredits);

    const { movieCredits, error, loading, getMovieCredits } = useMovieCredits();

    await getMovieCredits(123);

    expect(loading.value).toBe(false);
    expect(movieCredits.value).toEqual(mockCredits);
    expect(error.value).toBeNull();
  });

  it("fetches movie credits successfully", async () => {
    const mockCredits: CreditsResponse = {
      id: 123,
      cast: [
        {
          cast_id: 1,
          name: "Actor",
          character: "Character",
          profile_path: "/path.jpg",
        },
      ],
    };

    mockGet.mockResolvedValueOnce(mockCredits);

    const { movieCredits, error, loading, getMovieCredits } = useMovieCredits();

    await getMovieCredits(123);

    expect(loading.value).toBe(false);
    expect(movieCredits.value).toEqual(mockCredits);
    expect(error.value).toBeNull();
  });

  it("handles error while fetching movie credits", async () => {
    const mockErrorResponse = new Error("Failed to fetch");

    mockGet.mockResolvedValueOnce(null);
    mockError.value = mockErrorResponse;

    const { movieCredits, error, loading, getMovieCredits } = useMovieCredits();

    await getMovieCredits(123);

    expect(loading.value).toBe(false);
    expect(movieCredits.value).toBeNull();
    expect(error.value).toEqual(mockErrorResponse);
  });

  it("handles loading state correctly", async () => {
    mockGet.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ id: 123, cast: [], crew: [] }), 100);
        })
    );

    const { loading, getMovieCredits } = useMovieCredits();

    const promise = getMovieCredits(123);

    expect(loading.value).toBe(true);

    await promise;

    expect(loading.value).toBe(false);
  });
});
