<template>
  <div class="overflow-x-hidden" ref="scrollableList">
    <div class="flex gap-4" style="width: max-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const scrollableList = ref<HTMLDivElement | null>(null);

let isDown = false;
let startX: number;
let scrollLeft: number;
let isDragging = false;

const onMouseDown = (event: MouseEvent) => {
  isDown = true;
  startX = event.pageX - (scrollableList.value?.offsetLeft ?? 0);
  scrollLeft = scrollableList.value?.scrollLeft ?? 0;
  isDragging = false;
};

const onMouseLeave = () => {
  isDown = false;
};

const onMouseUp = () => {
  isDown = false;
  setTimeout(() => {
    isDragging = false;
  }, 0);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDown) return;
  event.preventDefault();
  isDragging = true;
  const x = event.pageX - (scrollableList.value?.offsetLeft ?? 0);
  const walk = x - startX;
  scrollableList.value!.scrollLeft = scrollLeft - walk;
};

const onTouchStart = (event: TouchEvent) => {
  isDown = true;
  startX = event.touches[0].pageX - (scrollableList.value?.offsetLeft ?? 0);
  scrollLeft = scrollableList.value?.scrollLeft ?? 0;
  isDragging = false;
};

const onTouchMove = (event: TouchEvent) => {
  if (!isDown) return;
  event.preventDefault();
  isDragging = true;
  const x = event.touches[0].pageX - (scrollableList.value?.offsetLeft ?? 0);
  const walk = x - startX;
  scrollableList.value!.scrollLeft = scrollLeft - walk;
};

const onTouchEnd = () => {
  isDown = false;
  setTimeout(() => {
    isDragging = false;
  }, 0);
};

const onClick = (event: MouseEvent | TouchEvent) => {
  if (isDragging) {
    event.preventDefault();
    event.stopPropagation();
  }
};

onMounted(() => {
  const list = scrollableList.value;

  if (!list) return;

  list.addEventListener("mousedown", onMouseDown);
  list.addEventListener("mouseleave", onMouseLeave);
  list.addEventListener("mouseup", onMouseUp);
  list.addEventListener("mousemove", onMouseMove);
  list.addEventListener("touchstart", onTouchStart);
  list.addEventListener("touchmove", onTouchMove);
  list.addEventListener("touchend", onTouchEnd);
  list.addEventListener("touchcancel", onTouchEnd);
  list.addEventListener("click", onClick, true);
  list.addEventListener("dragstart", (e) => e.preventDefault());
});

onBeforeUnmount(() => {
  const list = scrollableList.value;

  if (!list) return;

  list.removeEventListener("mousedown", onMouseDown);
  list.removeEventListener("mouseleave", onMouseLeave);
  list.removeEventListener("mouseup", onMouseUp);
  list.removeEventListener("mousemove", onMouseMove);
  list.removeEventListener("touchstart", onTouchStart);
  list.removeEventListener("touchmove", onTouchMove);
  list.removeEventListener("touchend", onTouchEnd);
  list.removeEventListener("touchcancel", onTouchEnd);
  list.removeEventListener("click", onClick, true);
  list.removeEventListener("dragstart", (e) => e.preventDefault());
});
</script>
