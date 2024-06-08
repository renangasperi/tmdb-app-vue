import { UnwrapRef, ref } from "vue";
import { useToast } from "vue-toastification";

type Params = Record<string, string>;

const BASE_URL = "https://api.themoviedb.org/3/";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDk5NWY5OTM5MTI3NjRlMmU3MjAyZTlhMGIxZDBiNCIsInN1YiI6IjY2NjEyMTU5MWY0ZGFhYzk1YWYyOTI5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XIk1kL0jh3HqBvL6pokRF6aHzQKgJ8gmoi6WAmSyGlI";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

function buildQueryParams(params: Params) {
  const query = new URLSearchParams(params).toString();
  return query;
}

export function useApi<T>() {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const toast = useToast();

  const get = async (url: string, params?: Params): Promise<T | null> => {
    loading.value = true;

    const queryString = buildQueryParams({ ...params, language: "pt-br" });

    try {
      const response = await fetch(`${BASE_URL}${url}?${queryString}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: T = await response.json();

      data.value = responseData as UnwrapRef<T>;
      error.value = null;

      return responseData;
    } catch (err) {
      toast.error("Falha ao realizar a requisição.", {
        timeout: 2000,
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    get,
  };
}
