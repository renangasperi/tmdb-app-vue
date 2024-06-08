import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VoteBadge from "../../../../src/components/common/VoteBadge.vue";

describe("VoteBadge", () => {
  it("renders the vote average correctly", () => {
    const voteAverage = 80;
    const wrapper = shallowMount(VoteBadge, {
      props: { voteAverage },
    });

    expect(wrapper.text()).toContain(`${voteAverage}%`);
  });

  it("sets the correct background color for vote average >= 70", () => {
    const voteAverage = 75;
    const wrapper = shallowMount(VoteBadge, {
      props: { voteAverage },
    });

    expect(wrapper.classes()).toContain("bg-green-500");
  });

  it("sets the correct background color for vote average >= 50", () => {
    const voteAverage = 60;
    const wrapper = shallowMount(VoteBadge, {
      props: { voteAverage },
    });

    expect(wrapper.classes()).toContain("bg-yellow-500");
  });

  it("sets the correct background color for vote average < 50", () => {
    const voteAverage = 40;
    const wrapper = shallowMount(VoteBadge, {
      props: { voteAverage },
    });

    expect(wrapper.classes()).toContain("bg-red-500");
  });
});
