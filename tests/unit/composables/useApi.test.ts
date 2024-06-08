import { describe, it, expect, vi, beforeEach } from "vitest";
import { useApi } from "../../../src/composables/useApi";
import { useToast } from "vue-toastification";

vi.mock("vue-toastification", () => ({
  useToast: vi.fn(),
}));

describe("useApi", () => {
  const mockFetch = vi.fn();
  const mockToast = {
    error: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = mockFetch;
    (useToast as any).mockReturnValue(mockToast);
  });

  it("fetches data successfully with query params", async () => {
    const mockData = { foo: "bar" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { data, error, loading, get } = useApi<typeof mockData>();

    const result = await get("movie/550", { query: "test" });

    expect(loading.value).toBe(false);
    expect(data.value).toEqual(mockData);
    expect(error.value).toBeNull();
    expect(result).toEqual(mockData);
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("fetches data successfully without query params", async () => {
    const mockData = { foo: "bar" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { data, error, loading, get } = useApi<typeof mockData>();

    const result = await get("movie/550");

    expect(loading.value).toBe(false);
    expect(data.value).toEqual(mockData);
    expect(error.value).toBeNull();
    expect(result).toEqual(mockData);
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("handles fetch error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { data, error, loading, get } = useApi();

    const result = await get("movie/550", { query: "test" });

    expect(loading.value).toBe(false);
    expect(data.value).toBeNull();
    expect(error.value).toBeNull();
    expect(result).toBeNull();
    expect(mockToast.error).toHaveBeenCalledWith(
      "Falha ao realizar a requisição.",
      { timeout: 2000 }
    );
  });

  it("handles fetch exception", async () => {
    const mockError = new Error("Fetch failed");
    mockFetch.mockRejectedValueOnce(mockError);

    const { data, error, loading, get } = useApi();

    const result = await get("movie/550", { query: "test" });

    expect(loading.value).toBe(false);
    expect(data.value).toBeNull();
    expect(error.value).toBeNull();
    expect(result).toBeNull();
    expect(mockToast.error).toHaveBeenCalledWith(
      "Falha ao realizar a requisição.",
      { timeout: 2000 }
    );
  });
});
