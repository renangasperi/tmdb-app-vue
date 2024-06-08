import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../../../../src/components/common/Header.vue";
import SearchBar from "../../../../src/components/common/SearchBar.vue";

describe("Header", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header);
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("has TMDB text", () => {
    const tmdb = wrapper.find("span");
    expect(tmdb.text()).toBe("TMDB");
  });

  it("has search icon", () => {
    const searchIcon = wrapper.find('img[alt="search icon"]');
    expect(searchIcon.exists()).toBe(true);
  });

  it("shows close icon and SearchBar when search icon is clicked", async () => {
    const searchIcon = wrapper.find('img[alt="search icon"]');
    await searchIcon.trigger("click");

    const closeIcon = wrapper.find('img[alt="close icon"]');
    expect(closeIcon.exists()).toBe(true);

    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(true);
  });

  it("hides SearchBar when close icon is clicked", async () => {
    const searchIcon = wrapper.find('img[alt="search icon"]');
    await searchIcon.trigger("click");

    const closeIcon = wrapper.find('img[alt="close icon"]');
    await closeIcon.trigger("click");

    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(false);
  });
});
