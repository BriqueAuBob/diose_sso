<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.push("/");
};
</script>

<template>
  <button
    @click="goBack"
    class="text-primary-600 text-left px-4 py-2 items-center flex gap-2 bg-white/25 hover:bg-white ease-out duration-300 w-fit rounded-xl mb-4"
  >
    <svg
      class="w-6 h-6 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      ></path>
    </svg>
    Retour
  </button>
</template>
