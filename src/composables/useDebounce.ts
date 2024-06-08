import { ref, Ref } from "vue";

export function useDebounce(value: string) {
  const debouncedValue = ref(value) as Ref<string>;

  let timeout: ReturnType<typeof setTimeout>;

  const updateValue = (newValue: string) => {
    if (newValue.length <= 3) {
      debouncedValue.value = "";
      return;
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, 500);
  };

  return { debouncedValue, updateValue };
}
