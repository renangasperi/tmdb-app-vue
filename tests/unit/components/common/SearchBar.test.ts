import { mount } from "@vue/test-utils";
import SearchBar from "../../../../src/components/common/SearchBar.vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { PaginatedResponse } from "../../../../src/types/api.interface";
import { Movie } from "../../../../src/types/movies.interface";

const mockRouter = {
  push: vi.fn(),
};

vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
}));

describe("SearchBar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchBar, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
      props: {
        slide: false,
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders search input and updates inputValue on input", async () => {
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);

    await input.setValue("test");
    expect(wrapper.vm.inputValue).toBe("test");
  });

  it("renders search results when searchList is not null", async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      results: [
        {
          id: 1,
          title: "test movie",
          release_date: "2023-06-01",
          poster_path: "/poster.jpg",
          vote_average: 8.5,
        },
      ],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    wrapper.vm.searchList = mockResponse;
    await nextTick();

    const searchResults = wrapper.findAll("li");

    expect(searchResults.length).toBe(1);
    expect(searchResults[0].text()).toBe("test movie");
  });

  it("handleMovieClick works as expected", async () => {
    const mockPush = vi.spyOn(mockRouter, "push").mockImplementation(() => {});

    await wrapper.vm.handleMovieClick(1);

    expect(mockPush).toHaveBeenCalledWith({
      name: "MovieDetails",
      path: "/movie/1",
      params: { id: "1" },
    });
  });
});
