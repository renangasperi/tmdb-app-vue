import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../../../src/composables/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should update debouncedValue after the delay", () => {
    const { debouncedValue, updateValue } = useDebounce("initial");

    expect(debouncedValue.value).toBe("initial");

    updateValue("updated");

    expect(debouncedValue.value).toBe("initial");

    vi.runAllTimers();

    expect(debouncedValue.value).toBe("updated");
  });

  it("should clear debouncedValue if new value length is <= 3", () => {
    const { debouncedValue, updateValue } = useDebounce("initial");

    updateValue("upd");

    vi.runAllTimers();

    expect(debouncedValue.value).toBe("");
  });

  it("should debounce multiple updates", () => {
    const { debouncedValue, updateValue } = useDebounce("initial");

    updateValue("first update");
    updateValue("second update");

    expect(debouncedValue.value).toBe("initial");

    vi.runAllTimers();

    expect(debouncedValue.value).toBe("second update");
  });

  it("should reset the timer on each update", () => {
    const { debouncedValue, updateValue } = useDebounce("initial");

    updateValue("first update");
    vi.advanceTimersByTime(250);
    updateValue("second update");

    expect(debouncedValue.value).toBe("initial");

    vi.runAllTimers();

    expect(debouncedValue.value).toBe("second update");
  });
});
