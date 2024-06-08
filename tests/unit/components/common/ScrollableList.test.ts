import { mount } from "@vue/test-utils";
import ScrollableList from "../../../../src/components/common/ScrollableList.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("ScrollableList", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ScrollableList, {
      slots: {
        default: '<div class="child">Child</div>',
      },
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders slot content", () => {
    expect(wrapper.find(".child").exists()).toBe(true);
    expect(wrapper.find(".child").text()).toBe("Child");
  });

  it("adds and removes event listeners on mount and unmount", () => {
    const addEventListenerSpy = vi.spyOn(
      window.HTMLElement.prototype,
      "addEventListener"
    );
    const removeEventListenerSpy = vi.spyOn(
      window.HTMLElement.prototype,
      "removeEventListener"
    );

    const wrapper = mount(ScrollableList);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mouseup",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchend",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "touchcancel",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      true
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "dragstart",
      expect.any(Function)
    );

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mouseup",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchstart",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchmove",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchend",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "touchcancel",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      true
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "dragstart",
      expect.any(Function)
    );
  });

  it("scrolls horizontally with touch drag", async () => {
    const scrollableListDiv = wrapper.find(".overflow-x-hidden");

    scrollableListDiv.element.scrollLeft = 0;

    await scrollableListDiv.trigger("touchstart", {
      touches: [{ pageX: 100 }],
    });
    await scrollableListDiv.trigger("touchmove", { touches: [{ pageX: 200 }] });
    await scrollableListDiv.trigger("touchend");

    await wrapper.vm.$nextTick();

    expect(scrollableListDiv.element.scrollLeft).toBeLessThan(0);
  });
});
