<script setup lang="ts">
import { PropType, computed } from "vue";
import discord from "../assets/discord.svg";
import google from "../assets/google.svg";
import github from "../assets/github.svg";

const props = defineProps({
  social: {
    type: String as PropType<"discord" | "google" | "github">,
    required: true,
  },
});

const icons = {
  discord,
  google,
  github,
};

const socialNormalized = computed(() => {
  return props.social.charAt(0).toUpperCase() + props.social.slice(1);
});
</script>

<template>
  <button
    class="flex gap-2 items-center justify-center p-4 bg-white text-neutral-800 rounded-2xl cursor-pointer text-center font-medium shadow-sm hover:-translate-y-1 ease-out duration-300 hover:shadow-md"
  >
    <component :is="icons[social]" class="w-6 h-6" /> Connexion avec
    {{ socialNormalized }}
  </button>
</template>
